import type { Pour } from '../index';

import DefaultTranslator from './DefaultTranslator';

class PourTranslator extends DefaultTranslator<Pour, Pour> {
  fromApi(apiValue: Pour): Pour {
    const cast = super.fromApi(apiValue);
    return {
      ...cast,
      beverage: this.getEntityIfNotDeleted(cast.beverage),
      location: this.getEntityIfNotDeleted(cast.location),
      tap: this.getEntityIfNotDeleted(cast.tap),
    };
  }
}

export default PourTranslator;
