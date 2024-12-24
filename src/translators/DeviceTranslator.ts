import type { Device, DeviceMutator } from '../dao/DeviceDAO';

import DefaultTranslator from './DefaultTranslator';

class DeviceTranslator extends DefaultTranslator<Device, DeviceMutator> {
  fromApi(apiValue: Device): Device {
    return {
      ...super.fromApi(apiValue),
      location:
        apiValue.location && apiValue.location.isDeleted
          ? undefined
          : apiValue.location,
    };
  }

  toForm({
    createdBy: _,
    isDeleted: _1,
    lastEdited: _2,
    lastEditedBy: _3,
    location,
    organization: _4,
    temperature: _5,
    ...otherProps
  }: Device): DeviceMutator {
    return {
      ...otherProps,
      locationId: location && location.id,
    };
  }
}

export default DeviceTranslator;
