// @flow
import type { Device, DeviceMutator } from '../index';

import DefaultTranslator from './DefaultTranslator';

class DeviceTranslator extends DefaultTranslator<Device, DeviceMutator> {
  fromApi(apiValue: Object): Device {
    return (({
      ...super.fromApi(apiValue),
      location: apiValue.location &&
        apiValue.location.isDeleted ? null : apiValue.location,
    }: any): Device);
  }

  toApi({ location, ...props }: DeviceMutator): Object {
    return {
      ...props,
      locationId: location && location.id,
    };
  }
}

export default DeviceTranslator;
