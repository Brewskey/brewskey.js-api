import type { EntityID, ODataDAOResult, ShortenedEntity } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import KegTranslator from '../translators/KegTranslator';
import { DAO_ENTITIES } from '../constants';
import { createFilter } from '../filters';

export type KegType =
  | 'Cornelius'
  | 'FiftyLitre'
  | 'HalfBarrel'
  | 'Mini'
  | 'QuarterBarrel'
  | 'SixthBarrel'
  | 'SlimQuarter';

export type Keg = {
  beverage: ShortenedEntity;
  floatedDate: Date;
  id: EntityID;
  isDeleted: boolean;
  kegType: KegType;
  location: ShortenedEntity | undefined;
  maxOunces: number;
  organization: ShortenedEntity;
  ounces: number;
  pulses: number;
  tap: ShortenedTap | undefined;
  tapDate: Date;
};

export type KegMutator = {
  beverageId: EntityID;
  id?: EntityID;
  kegType: KegType;
  startingPercentage?: number;
  tapId: EntityID;
};

export const MAX_OUNCES_BY_KEG_TYPE = {
  Cornelius: 640,
  FiftyLitre: 1690.7,
  HalfBarrel: 1984,
  Mini: 169,
  QuarterBarrel: 992,
  SixthBarrel: 661,
  SlimQuarter: 992,
} as const;

class KegDAOImpl extends ODataDAO<Keg, KegMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.KEGS,
      navigationProperties: {
        beverage: { select: ['id', 'isDeleted', 'name'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
        tap: { select: ['id', 'isDeleted'] },
      },
      translator: new KegTranslator(),
    });
  }

  async fetchKegByTapID(tapId: string): Promise<Keg> {
    const result = await this.fetchMany({
      filters: [createFilter('tap/id').equals(tapId)],
      orderBy: [
        {
          column: 'tapDate',
          direction: 'desc',
        },
      ],
      take: 1,
    });

    if (!result[0]) {
      const error = new Error('Not found') as Error & { status: number };
      error.status = 404;
      throw error;
    }

    return result[0];
  }

  floatKeg(tapID: EntityID): Promise<ODataDAOResult<unknown>> {
    const funcString = 'Default.floatKeg()';
    const stringifiedID = tapID.toString();

    const handler = this.__buildHandler({}, false)
      .find(this.__reformatValue(stringifiedID))
      .func(funcString);

    return this.__mutateCustom(handler, 'PUT');
  }
}

export const KegDAO = new KegDAOImpl();
