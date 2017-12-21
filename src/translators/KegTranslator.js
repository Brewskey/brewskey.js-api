// @flow

import type { Keg, KegMutator } from '../index';

import DefaultTranslator from './DefaultTranslator';

class KegTranslator extends DefaultTranslator<Keg, KegMutator> {
  fromApi(apiValue: Object): Keg {
    return (({
      ...super.fromApi(apiValue),
      location: apiValue.location.isDeleted ? null : apiValue.location,
      tap: apiValue.tap.isDeleted ? null : apiValue.tap,
    }: any): Keg);
  }
}

export default KegTranslator;
