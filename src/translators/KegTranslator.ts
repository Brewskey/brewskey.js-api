import type { Keg, KegMutator } from '../dao/KegDAO';

import DefaultTranslator from './DefaultTranslator';

class KegTranslator extends DefaultTranslator<Keg, KegMutator> {
  fromApi(apiValue: Keg): Keg {
    return {
      ...super.fromApi(apiValue),
      location: apiValue.location?.isDeleted ? null : apiValue.location,
      tap: apiValue.tap?.isDeleted ? null : apiValue.tap,
    };
  }
}

export default KegTranslator;
