// @flow
declare module 'brewskey.js-api' {
  declare type BeverageType =
    'Beer' |
    'Cider' |
    'Coffee' |
    'Soda';

  declare type ServingTemperature =
    'cellar' |
    'cold' |
    'cool' |
    'hot' |
    'very_cold' |
    'warm';

  declare type Beverage = {
    abv: number,
    availableId: ?string,
    beerVariationId: ?string,
    beverageType: BeverageType,
    createDate: Date,
    createdBy: {
      id: string,
      userName: string,
    },
    description: ?string,
    externalId: ?string,
    foodPairings: ?string,
    glasswareId: ?number,
    ibu: number,
    id: string,
    isOrganic: ?string,
    labels: {
      icon: string,
      large: string,
      medium: string,
    },
    name: string,
    originalGravity: ?number,
    servingTemperature: ?ServingTemperature,
    servingTemperatureDisplay: ?string,
    srmId: ?string,
    styleId: ?string,
    updateDate: Date,
    year: ?number,
  };
}
