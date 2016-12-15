// @flow
export type Schedule = {
  accounts: Array<{
    id: string,
    name: string,
  }>,
  createdDate: Date,
  days: number,
  editDate: Date,
  endTime: Date,
  id: string,
  location: {
    id: string,
    name: string,
  },
  name: string,
  startTime: Date,
};

export type ScheduleMutator = {
  accounts: Array<{
    id: string,
    name: string,
  }>,
  days: number,
  endTime: Date,
  id: ?string,
  locationId: ?string,
  name: string,
  startTime: Date,
};
