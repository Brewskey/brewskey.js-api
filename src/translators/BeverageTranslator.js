// @flow
import type { Beverage } from '../types';
import DefaultTranslator from './DefaultTranslator';

const ID_FIELDS = [
  'availableId',
  'beerVariationId',
  'externalId',
  'glasswareId',
  'srmId',
  'styleId',
];

class BeverageTranslator extends DefaultTranslator<Beverage, Beverage> {
  fromApi(apiValue: Object): Beverage {
    const obj = super.fromApi(apiValue);
    ID_FIELDS.forEach((field: string) => {
      obj[field] = obj[field] && obj[field].toString();
    });
    return obj;
  }
}

export default BeverageTranslator;
