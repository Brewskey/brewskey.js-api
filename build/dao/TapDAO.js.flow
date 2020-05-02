// @flow

import type { OHandler } from 'odata';
import type LoadObject from '../LoadObject';
import type { EntityID, QueryOptions, ShortenedEntity } from '../types';
import type { KegType } from './KegDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

export type LeaderboardItem = {|
  lastPourDate: Date,
  totalOunces: number,
  totalPours: number,
  userID: ?EntityID,
  userName: ?string,
|};

export type CurrentKeg = {|
  beverage: {| id: string, name: string |},
  id: string,
  kegType: KegType,
  maxOunces: number,
  ounces: number,
|};

export type Tap = {|
  createdDate: Date,
  currentKeg: CurrentKeg,
  description: ?string,
  device: ShortenedEntity,
  disableBadges: boolean,
  hideLeaderboard: boolean,
  hideStats: boolean,
  id: EntityID,
  isPaymentEnabled: boolean,
  location: ?ShortenedEntity,
  organization: ShortenedEntity,
  requiresPourPrivilege: boolean,
  tapNumber: number,
|};

export type TapMutator = {|
  description: ?string,
  deviceId: ?EntityID,
  disableBadges: boolean,
  hideLeaderboard: boolean,
  hideStats: boolean,
  id: ?EntityID,
  isPaymentEnabled: boolean,
  locationId: ?EntityID,
  requiresPourPrivilege: boolean,
|};

export type ShortenedTap = {| id: EntityID, isDeleted: boolean |};

class TapDAO extends ODataDAO<Tap, TapMutator> {
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
  ): LoadObject<number> {
    const funcString = `Default.leaderboard(timeSpan=duration'${duration}')`;
    const stringifiedID = tapID.toString();

    return this.__countCustom(
      (countQueryOptions: QueryOptions): OHandler<Object> => {
        const handler = this.__buildHandler(
          {
            ...queryOptions,
            ...countQueryOptions,
          },
          false,
        ).find(this.__reformatIDValue(stringifiedID));
        handler.func(funcString);

        return handler;
      },
      queryOptions,
      funcString,
    );
  }

  fetchLeaderboard(
    tapID: EntityID,
    duration: string,
    queryOptions?: QueryOptions,
  ): LoadObject<Array<LeaderboardItem>> {
    const funcString = `Default.leaderboard(timeSpan=duration'${duration}')`;
    const stringifiedID = tapID.toString();

    const handler = this.__buildHandler(queryOptions, false).find(
      this.__reformatIDValue(stringifiedID),
    );
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions, funcString);
  }
}

export default new TapDAO();
