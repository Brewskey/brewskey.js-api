// @flow
export type Pour = {
  beverage: {
    id: number,
    name: string,
  },
  id: number,
  location: {
    id: number,
    name: string,
  },
  ounces: number,
  owner: {
    id: string,
    userName: string,
  },
  pourDate: string,
  pulses: number,
  tap: {
    id: number,
    name: string,
  },
};
