// @flow

import type { EntityID, ShortenedEntity } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import ScheduleTranslator from '../translators/ScheduleTranslator';

export type Schedule = {|
  accounts: Array<{|
    id: EntityID,
    userName: string,
  |}>,
  createdDate: Date,
  days: number,
  editDate: Date,
  endTime: Date,
  id: EntityID,
  isDeleted: boolean,
  location: ?ShortenedEntity,
  name: string,
  startTime: Date,
|};

export type ScheduleMutator = {|
  accounts: Array<{|
    id: EntityID,
    userName: string,
  |}>,
  days: number,
  endTime: Date,
  id: ?EntityID,
  locationId: ?string,
  name: string,
  startTime: Date,
|};

class ScheduleDAO extends ODataDAO<Schedule, ScheduleMutator> {
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
