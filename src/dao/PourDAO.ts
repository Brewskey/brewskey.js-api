import type { EntityID, QueryOptions, ShortenedEntity } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import PourTranslator from '../translators/PourTranslator';
import nullthrows from 'nullthrows';

export type Pour = {
  total: number;
  beverage: ShortenedEntity | undefined;
  device: ShortenedEntity | null | undefined;
  id: EntityID;
  isDeleted: boolean;
  keg: {
    id: EntityID;
  };
  location: ShortenedEntity | undefined;
  organization: ShortenedEntity;
  ounces: number;
  owner: {
    id: EntityID;
    userName: string;
  };
  pourDate: string;
  pulses: number;
  tap: ShortenedTap | undefined;
};

class PourDAOImpl extends ODataDAO<Pour, Pour> {
  isAutoflushToggled: boolean = true;

  _accumulatedIds: Set<EntityID> = new Set();

  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: { select: ['id', 'isDeleted', 'name'] },
        device: { select: ['id', 'isDeleted', 'name'] },
        keg: { select: ['id'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
        owner: { select: ['id', 'userName'] },
        tap: { select: ['id', 'isDeleted'] },
      },
      translator: new PourTranslator(),
    });

    // Signalr.TapHub.registerListener('newPour', this._onNewPour);
  }

  getPoursByBeverageIDs(
    beverageIDs: Array<EntityID>,
    userID?: EntityID,
  ): Promise<Map<EntityID, number>> {
    const filters = [
      `beverage/id in (${beverageIDs.join(', ')})`,
      userID != null ? `owner/id eq '${userID}'` : null,
      'isDeleted eq false',
    ].filter(Boolean);
    const queryOptions = {
      apply: `filter((${filters.join(
        ') and (',
      )}))/groupby((beverage/id),aggregate(ounces with sum as total))`,
      shouldIgnoreOrganizationID: true,
    } as const;
    return this.__fetchCustom<Pour[], QueryOptions>(
      this.__buildHandler(queryOptions, false),
      queryOptions,
    ).then(
      (results) =>
        new Map(
          results.map((item) => [
            nullthrows(item.beverage).id.toString(),
            item.total,
          ]),
        ),
    );
  }
}

export const PourDAO = new PourDAOImpl();
