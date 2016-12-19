// @flow
declare module 'brewskey.js-api' {
  declare type Location = {
    city: string,
    createdDate: string,
    description: string,
    geolocation: Object,
    id: number,
    locationType: string,
    name: string,
    state: ?string,
    street: string,
    suite: string,
    summary: string,
    timeZone: string,
    zipCode: number,
  };
}
