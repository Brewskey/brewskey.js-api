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

  toApi({
    availability,
    glass,
    isOrganic,
    srm,
    style,
    ...props
  }: Beverage): Object {
    return {
      ...props,
      availabilityId: availability && availability.id,
      glasswareId: glass && glass.id,
      isOrganic: isOrganic ? 'Y' : 'N',
      srmId: srm && srm.id,
      styleId: style && style.id,
    };
  }

  toForm(model: Schedule): ScheduleMutator {
    return {
      ...model,
      locationId: model.location ? model.location.id.toString() : null,
    };
  }
}

export default BeverageTranslator;
