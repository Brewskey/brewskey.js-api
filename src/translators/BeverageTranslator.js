// @flow
import type { Beverage } from '../index';
import DefaultTranslator from './DefaultTranslator';

class BeverageTranslator extends DefaultTranslator<Beverage, Beverage> {
  fromApi(apiValue: Object): Beverage {
    return (({
      ...super.fromApi(apiValue),
      isOrganic: apiValue.isOrganic === 'Y',
    }: any): Beverage);
  }

  toApi(
    {
      availability,
      glassware,
      isOrganic,
      srm,
      style,
      ...props
  }: Beverage): Object {
    return {
      ...props,
      availabilityId: availability && availability.id,
      glasswareId: glassware && glassware.id,
      isOrganic: isOrganic ? 'Y' : 'N',
      srmId: srm && srm.id,
      styleId: style && style.id,
    };
  }
}

export default BeverageTranslator;
