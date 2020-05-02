// @flow
import type { Beverage, BeverageMutator } from '../dao/BeverageDAO';
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
    abv,
    availability,
    beverageType,
    description,
    glass,
    ibu,
    id,
    isOrganic,
    name,
    originalGravity,
    servingTemperature,
    srm,
    style,
    year,
  }: Beverage): BeverageMutator {
    return {
      abv,
      availableId: availability && availability.id,
      beverageType,
      description,
      glasswareId: glass && glass.id,
      ibu,
      id,
      isOrganic,
      name,
      originalGravity,
      servingTemperature,
      srmId: srm && srm.id,
      styleId: style && style.id,
      year,
    };
  }
}

export default BeverageTranslator;
