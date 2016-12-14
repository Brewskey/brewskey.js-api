// @flow
import type { Schedule, ScheduleMutator } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import ScheduleTranslator from '../translators/Schedule';

class ScheduleDAO extends DAO<Schedule, ScheduleMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.SCHEDULES,
      navigationProperties: {
        accounts: ['id', 'userName'],
        location: ['id', 'name'],
      },
      translator: new ScheduleTranslator(),
    });
  }
}

export default new ScheduleDAO();
