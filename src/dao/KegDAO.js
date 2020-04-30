// @flow

import type { EntityID, ShortenedEntity } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import KegTranslator from '../translators/KegTranslator';
import LoadObject from '../LoadObject';
import { DAO_ENTITIES } from '../constants';
import { createFilter } from '../filters';

export type KegType =
  | 'Cornelius'
  | 'HalfBarrel'
  | 'Mini'
  | 'QuarterBarrel'
  | 'SixthBarrel'
  | 'SlimQuarter';

export type Keg = {
  beverage: ShortenedEntity,
  floatedDate: Date,
  id: EntityID,
  isDeleted: boolean,
  kegType: KegType,
  location: ?ShortenedEntity,
  maxOunces: number,
  organization: ShortenedEntity,
  ounces: number,
  pulses: number,
  tap: ?ShortenedTap,
  tapDate: Date,
};

export type KegMutator = {
  beverageId: EntityID,
  id?: EntityID,
  kegType: KegType,
  startingPercentage?: number,
  tapId: EntityID,
};

export const MAX_OUNCES_BY_KEG_TYPE: { [KegType]: number } = {
  Cornelius: 640,
  HalfBarrel: 1984,
  Mini: 169,
  QuarterBarrel: 992,
  SixthBarrel: 661,
  SlimQuarter: 992,
};

class KegDAO extends ODataDAO<Keg, KegMutator> {
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

  fetchKegByTapID = (tapId: string): LoadObject<Array<LoadObject<Keg>>> =>
    this.fetchMany({
      filters: [createFilter('tap/id').equals(tapId)],
      orderBy: [
        {
          column: 'tapDate',
          direction: 'desc',
        },
      ],
      take: 1,
    });

  floatKeg(tapID: string): string {
    const funcString = 'Default.floatKeg()';
    const stringifiedID = tapID.toString();

    const handler = this.__buildHandler({}, false)
      .find(this.__reformatIDValue(stringifiedID))
      .func(funcString);

    return this.__mutateCustom(handler, 'PUT', tapID, null);
  }
}

export default new KegDAO();
