import type { Pour } from '../index';

import DefaultTranslator from './DefaultTranslator';

class PourTranslator extends DefaultTranslator<Pour, Pour> {
  fromApi(apiValue: Pour): Pour {
    return {
      ...super.fromApi(apiValue),
      beverage: apiValue.beverage?.isDeleted ? null : apiValue.beverage,
      location: apiValue.location?.isDeleted ? null : apiValue.location,
      tap: apiValue.tap?.isDeleted ? null : apiValue.tap,
    };
  }
}

export default PourTranslator;
