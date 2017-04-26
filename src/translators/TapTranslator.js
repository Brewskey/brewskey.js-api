// @flow
import type { Tap, TapMutator } from '../index';

import DefaultTranslator from './DefaultTranslator';

class TapsTranslator extends DefaultTranslator<Tap, TapMutator> {
  fromApi(apiValue: Object): Tap {
    return (({
      ...super.fromApi(apiValue),
      location: apiValue.location.isDeleted ? null : apiValue.location,
    }: any): Tap);
  }

  toForm(model: Tap): TapMutator {
    return {
      ...model,
      deviceId: model.device.id,
      locationId: model.location && model.location.id,
    };
  }
}

export default TapsTranslator;
