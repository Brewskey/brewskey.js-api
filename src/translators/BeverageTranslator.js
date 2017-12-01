// @flow
import type { Beverage, BeverageMutator } from '../index';
import DefaultTranslator from './DefaultTranslator';

class BeverageTranslator extends DefaultTranslator<Beverage, BeverageMutator> {
  fromApi(apiValue: Object): Beverage {
    return (({
      ...super.fromApi(apiValue),
      isOrganic: apiValue.isOrganic === 'Y',
    }: any): Beverage);
  }

  toApi({ isOrganic, ...props }: BeverageMutator): Object {
    return {
      ...props,
      isOrganic: isOrganic ? 'Y' : 'N',
    };
  }

  toForm({
    availability,
    glass,
    location,
    srm,
    style,
    ...props
  }: Beverage): BeverageMutator {
    return {
      ...props,
      availableId: availability && availability.id.toString(),
      glasswareId: glass && glass.id.toString(),
      srmId: srm && srm.id,
      styleId: style && style.id,
    };
  }
}

export default BeverageTranslator;
