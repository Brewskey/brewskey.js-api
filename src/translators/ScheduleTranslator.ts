import type { EntityID } from '../types';
import type { Schedule, ScheduleMutator } from '../dao/ScheduleDAO';

import DefaultTranslator from './DefaultTranslator';

enum ScheduleDayBitMap {
  All = 127,
  Friday = 16,
  Monday = 1,
  None = 0,
  Saturday = 32,
  Sunday = 64,
  Thursday = 8,
  Tuesday = 2,
  Wednesday = 4,
  WeekDays = 31,
}

const foo = ScheduleDayBitMap.Monday | ScheduleDayBitMap.Tuesday;

const getCombinedFlag = (days: ScheduleDayBitMap[]): number =>
  days.reduce(
    (total: ScheduleDayBitMap, day: ScheduleDayBitMap): number => total | day, // eslint-disable-line
    0,
  );

export type ApiSchedule = Omit<Schedule, 'days'> & {
  days: string;
};
export type ApiScheduleMutator = ScheduleMutator & { accountIds: EntityID[] };

// todo clean translator when we will implement schedules in mobile app
class SchedulesTranslator extends DefaultTranslator<
  Schedule,
  ScheduleMutator,
  ApiSchedule,
  ApiScheduleMutator
> {
  fromApi(apiValue: ApiSchedule): Schedule {
    const cast = super.fromApi(apiValue);
    return {
      ...cast,
      days: getCombinedFlag(
        apiValue.days.split(', ').map((value) => Number.parseInt(value)),
      ),
      location: this.getEntityIfNotDeleted(cast.location),
    };
  }

  toApi(mutator: ScheduleMutator): ApiScheduleMutator {
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
