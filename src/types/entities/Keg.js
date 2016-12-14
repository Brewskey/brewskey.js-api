// @flow
export type Keg = {
  beerIcon: string,
  beerId: string,
  beerName: string,
  floatedDate: string,
  id: number,
  kegType: string,
  location: {
    id: number,
    name: string,
  },
  maxOunces: number,
  ounces: number,
  pulses: number,
  tap: {
    id: number,
    name: string,
  },
  tapDate: string,
};
