// @flow

import type LoadObject from '../LoadObject';
import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type AchievementType =
  | 'BackOnTheBus'
  | 'BeerAficionado'
  | 'BeerAuthority'
  | 'BeerBeforeNoon'
  | 'BeerBuff'
  | 'BeerConnoisseur'
  | 'DrankAKeg'
  | 'DrankFiveKegs'
  | 'DrankTenKegs'
  | 'Edward40Hands'
  | 'FirstPourOfTheDay'
  | 'HatTrick'
  | 'KingOfTheKeg'
  | 'LastPourOfTheKeg'
  | 'LastPourOfTheNight'
  | 'LightWeight'
  | 'PowerHour'
  | 'SevenDaysStraight'
  | 'Welcome';

export type Achievement = {
  achievementType: AchievementType,
  createdDate: Date,
  id: EntityID,
};

export type AchievementCounter = {
  achievementType: AchievementType,
  total: number,
};

class AchievementDAO extends ODataDAO<Achievement, Achievement> {
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
