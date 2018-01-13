// @flow
import type {
  EntityID,
  LeaderboardItem,
  QueryOptions,
  Tap,
  TapMutator,
} from '../index';
import type LoadObject from '../LoadObject';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

class TapDAO extends DAO<Tap, TapMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.TAPS,
      selectExpandQuery: {
        expand: {
          device: ['id', 'isDeleted', 'name'],
          location: ['id', 'isDeleted', 'name'],
          organization: ['id', 'isDeleted', 'name'],
        },
      },
      translator: new TapTranslator(),
    });
  }

  fetchLeaderboard(
    tapID: EntityID,
    queryOptions?: QueryOptions,
  ): LoadObject<Array<LeaderboardItem>> {
    const funcString = 'Default.leaderboard()';
    const stringifiedID = tapID.toString();

    const handler = this.__buildHandler(queryOptions, false).find(
      this.__reformatIDValue(stringifiedID),
    );
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions, funcString);
  }
}

export default new TapDAO();
