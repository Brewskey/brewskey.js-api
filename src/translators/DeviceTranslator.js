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
