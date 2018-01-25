// @flow
import type { Schedule, ScheduleMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import ScheduleTranslator from '../translators/ScheduleTranslator';

class ScheduleDAO extends DAO<Schedule, ScheduleMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.SCHEDULES,
      navigationProperties: {
        accounts: { select: ['id', 'userName'] },
        locations: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new ScheduleTranslator(),
    });
  }
}

export default new ScheduleDAO();
