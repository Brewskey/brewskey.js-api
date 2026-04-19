import type { OHandler } from 'odata';
import type { EntityID, QueryOptions, ShortenedEntity } from '../types';
import type { KegType } from './KegDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

export type LeaderboardItem = {
  lastPourDate: Date;
  totalOunces: number;
  totalPours: number;
  userID: EntityID | null | undefined;
  userName: string | null | undefined;
};

export type CurrentKeg = {
  beverage: {
    id: string;
    name: string;
  };
  id: string;
  kegType: KegType;
  maxOunces: number;
  ounces: number;
};

export type Tap = {
  createdDate: Date;
  currentKeg: CurrentKeg;
  description: string | null | undefined;
  device: ShortenedEntity;
  disableBadges: boolean;
  hideLeaderboard: boolean;
  hideStats: boolean;
  id: EntityID;
  isPaymentEnabled: boolean;
  location: ShortenedEntity | undefined;
  organization: ShortenedEntity;
  requiresPourPrivilege: boolean;
  tapNumber: number;
};

export type TapMutator = {
  description: string | null | undefined;
  deviceId: EntityID | null | undefined;
  disableBadges: boolean;
  hideLeaderboard: boolean;
  hideStats: boolean;
  id: EntityID | null | undefined;
  isPaymentEnabled: boolean;
  locationId: EntityID | null | undefined;
  requiresPourPrivilege: boolean;
};

export type ShortenedTap = {
  id: EntityID;
  isDeleted: boolean;
};

class TapDAOImpl extends ODataDAO<Tap, TapMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.TAPS,
      navigationProperties: {
        currentKeg: {
          expand: { beverage: { select: ['id', 'name'] } },
          select: ['id', 'kegType', 'maxOunces', 'ounces'],
        },
        device: { select: ['id', 'isDeleted', 'name'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new TapTranslator(),
    });
  }

  countLeaderboard(
    tapID: EntityID,
    duration: string,
    queryOptions?: QueryOptions,
  ): Promise<number> {
    const funcString = `Default.leaderboard(timeSpan=duration'${duration}')`;
    const stringifiedID = tapID.toString();

    return this.__countCustom(
      (countQueryOptions: QueryOptions): OHandler<Tap> => {
        const handler = this.__buildHandler(
          {
            ...queryOptions,
            ...countQueryOptions,
          },
          false,
        ).find(this.__reformatValue(stringifiedID));
        handler.func(funcString);

        return handler;
      },
      queryOptions,
    );
  }

  fetchLeaderboard(
    tapID: EntityID,
    duration: string,
    queryOptions?: QueryOptions,
  ): Promise<Array<LeaderboardItem>> {
    const funcString = `Default.leaderboard(timeSpan=duration'${duration}')`;
    const stringifiedID = tapID.toString();

    const handler = this.__buildHandler(queryOptions, false).find(
      this.__reformatValue(stringifiedID),
    );
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions);
  }
}

export const TapDAO = new TapDAOImpl();
