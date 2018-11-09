// @flow
import type {
  EntityID,
  LeaderboardItem,
  QueryOptions,
  Tap,
  TapMutator,
} from '../index';
import type LoadObject from '../LoadObject';
import oHandler from 'odata';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

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
      (countQueryOptions: QueryOptions): oHandler<Object> => {
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
