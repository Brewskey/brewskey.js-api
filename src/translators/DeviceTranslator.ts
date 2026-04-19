import type { Device, DeviceMutator } from '../dao/DeviceDAO';

import DefaultTranslator from './DefaultTranslator';

class DeviceTranslator extends DefaultTranslator<Device, DeviceMutator> {
  fromApi(apiValue: Device): Device {
    const cast = super.fromApi(apiValue);
    return {
      ...cast,
      location: this.getEntityIfNotDeleted(cast.location),
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
