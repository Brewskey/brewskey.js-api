// @flow

import type LoadObject from '../LoadObject';
import type { Achievement, AchievementCounter, EntityID } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class AchievementDAO extends DAO<Achievement, Achievement> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACHIEVEMENTS,
      translator: new DefaultTranslator(),
    });
  }

  fetchAchievementCounters(
    userID: EntityID,
  ): LoadObject<Array<AchievementCounter>> {
    const queryOptions = {
      apply:
        `filter((owner/id eq '${userID}'))` +
        '/groupby((achievementType),aggregate($count as total))',
    };
    return this.__fetchCustom(this.__buildHandler(queryOptions), queryOptions);
  }
}

export default new AchievementDAO();
