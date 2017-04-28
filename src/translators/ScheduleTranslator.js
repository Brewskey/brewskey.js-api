// @flow
import type { Schedule, ScheduleMutator } from '../index';

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

const getCombinedFlag = (
  days: Array<string>,
): number =>
  days.reduce(
    (
      total: number,
      day: string,
    ): number => total | SCHEDULE_DAY_BIT_MAP[day], // eslint-disable-line
    0,
  );

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
      accountIds: mutator.accounts && mutator.accounts.map(
        (account: { id: string, name: string }): string => account.id,
      ),
    };
  }

  toForm(model: Schedule): ScheduleMutator {
    return {
      ...model,
      locationId: model.location ? model.location.id : null,
    };
  }
}

export default SchedulesTranslator;
