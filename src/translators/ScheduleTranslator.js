// @flow

import type { EntityID } from '../types';
import type { Schedule, ScheduleMutator } from '../dao/ScheduleDAO';

import DefaultTranslator from './DefaultTranslator';

const SCHEDULE_DAY_BIT_MAP = {
  All: 127,
  Friday: 16,
  Monday: 1,
  None: 0,
  Saturday: 32,
  Sunday: 64,
  Thursday: 8,
  Tuesday: 2,
  Wednesday: 4,
  WeekDays: 31,
};

const getCombinedFlag = (days: Array<string>): number =>
  days.reduce(
    (total: number, day: string): number => total | SCHEDULE_DAY_BIT_MAP[day], // eslint-disable-line
    0,
  );

// todo clean translator when we will implement schedules in mobile app
class SchedulesTranslator extends DefaultTranslator<Schedule, ScheduleMutator> {
  fromApi(apiValue: Object): Schedule {
    return {
      ...super.fromApi(apiValue),
      days: getCombinedFlag(apiValue.days.split(', ')),
      location: apiValue.location.isDeleted ? null : apiValue.location,
    };
  }

  toApi(mutator: ScheduleMutator): Object {
    return {
      ...mutator,
      accountIds:
        mutator.accounts &&
        mutator.accounts.map(({ id }: { id: EntityID }): EntityID => id),
    };
  }

  toForm({
    accounts,
    days,
    endTime,
    id,
    location,
    name,
    startTime,
  }: Schedule): ScheduleMutator {
    return {
      accounts,
      days,
      endTime,
      id,
      locationId: location ? location.id.toString() : null,
      name,
      startTime,
    };
  }
}

export default SchedulesTranslator;
