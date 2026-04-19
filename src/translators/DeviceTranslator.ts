import type { Device, DeviceMutator } from '../dao/DeviceDAO';

import DefaultTranslator from './DefaultTranslator';

class DeviceTranslator extends DefaultTranslator<Device, DeviceMutator> {
  fromApi(apiValue: Device): Device {
    const rawLocation = apiValue.location;
    const location =
      rawLocation && rawLocation.isDeleted ? undefined : rawLocation;
    return {
      ...super.fromApi(apiValue),
      location,
      locationId: rawLocation?.id,
    };
  }

  toForm({
    createdBy: _,
    isDeleted: _1,
    lastEdited: _2,
    lastEditedBy: _3,
    location,
    locationId: persistedLocationId,
    organization: _4,
    temperature: _5,
    ...otherProps
  }: Device): DeviceMutator {
    return {
      ...otherProps,
      locationId: (location && location.id) ?? persistedLocationId,
    };
  }
}

export default DeviceTranslator;
