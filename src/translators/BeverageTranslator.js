// @flow
import type { Beverage } from '../index';
import DefaultTranslator from './DefaultTranslator';

class BeverageTranslator extends DefaultTranslator<Beverage, Beverage> {
  toApi(
    {
      availability,
      glassware,
      srm,
      style,
      ...props
  }: Beverage): Object {
    return {
      ...props,
      availabilityId: availability && availability.id,
      glasswareId: glassware && glassware.id,
      srmId: srm && srm.id,
      styleId: style && style.id,
    };
  }
}

export default BeverageTranslator;
