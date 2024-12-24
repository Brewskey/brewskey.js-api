import type { Beverage, BeverageMutator } from '../dao/BeverageDAO';
import DefaultTranslator from './DefaultTranslator';

export type ApiBeverage = Omit<Beverage, 'isOrganic'> & {
  isOrganic: 'Y' | 'N';
};
export type ApiBeverageMutator = Omit<BeverageMutator, 'isOrganic'> & {
  isOrganic: 'Y' | 'N';
};

class BeverageTranslator extends DefaultTranslator<
  Beverage,
  BeverageMutator,
  ApiBeverage,
  ApiBeverageMutator
> {
  fromApi(apiValue: ApiBeverage): Beverage {
    return {
      ...super.fromApi(apiValue),
      isOrganic: apiValue.isOrganic === 'Y',
    } as Beverage;
  }

  toApi({ isOrganic, ...props }: BeverageMutator): ApiBeverageMutator {
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
