// @flow

import type { Achievement } from '../index';

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
}

export default new AchievementDAO();
