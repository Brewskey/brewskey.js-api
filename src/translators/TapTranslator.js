// @flow
import type { Tap, TapMutator } from '../index';

import DefaultTranslator from './DefaultTranslator';

class TapsTranslator extends DefaultTranslator<Tap, TapMutator> {
  fromApi(apiValue: Object): Tap {
    return (({
      ...super.fromApi(apiValue),
      location:
        apiValue.location && apiValue.location.isDeleted
          ? null
          : apiValue.location,
    }: any): Tap);
  }

  toForm({ device, location, ...props }: Tap): TapMutator {
    return {
      ...props,
      deviceId: device && device.id,
      locationId: location && location.id,
    };
  }
}

export default TapsTranslator;
