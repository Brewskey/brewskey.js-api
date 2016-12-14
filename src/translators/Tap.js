// @flow
import type { Tap, TapMutator } from '../types';

import DefaultTranslator from './Default';

class TapsTranslator extends DefaultTranslator<Tap, TapMutator> {
  toForm(model: Tap): TapMutator {
    return {
      ...model,
      deviceId: model.device.id,
      locationId: model.location.id,
    };
  }
}

export default TapsTranslator;
