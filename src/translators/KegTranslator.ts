import type { Keg, KegMutator } from '../dao/KegDAO';

import DefaultTranslator from './DefaultTranslator';

class KegTranslator extends DefaultTranslator<Keg, KegMutator> {
  fromApi(apiValue: Keg): Keg {
    const cast = super.fromApi(apiValue);
    return {
      ...cast,
      location: this.getEntityIfNotDeleted(cast.location),
      tap: this.getEntityIfNotDeleted(cast.tap),
    };
  }
}

export default KegTranslator;
