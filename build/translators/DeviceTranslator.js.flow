// @flow
import type { Device, DeviceMutator } from '../dao/DeviceDAO';

import DefaultTranslator from './DefaultTranslator';

class DeviceTranslator extends DefaultTranslator<Device, DeviceMutator> {
  fromApi(apiValue: Object): Device {
    return (({
      ...super.fromApi(apiValue),
      location:
        apiValue.location && apiValue.location.isDeleted
          ? null
          : apiValue.location,
    }: any): Device);
  }

  toForm({
    deviceStatus,
    deviceType,
    id,
    location,
    name,
    particleId,
  }: Device): DeviceMutator {
    return {
      deviceStatus,
      deviceType,
      id,
      locationId: location && location.id,
      name,
      particleId,
    };
  }
}

export default DeviceTranslator;
