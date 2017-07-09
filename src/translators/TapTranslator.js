// @flow
import type { Tap, TapMutator } from '../index';

import DefaultTranslator from './DefaultTranslator';

class TapsTranslator extends DefaultTranslator<Tap, TapMutator> {
  fromApi(apiValue: Object): Tap {
    return (({
      ...super.fromApi(apiValue),
      location: apiValue.location &&
        apiValue.location.isDeleted ? null : apiValue.location,
    }: any): Tap);
  }

  toApi({ device, ...props }: TapMutator): Object {
    return {
      ...props,
      deviceId: device.id,
    };
  }
}

export default TapsTranslator;
