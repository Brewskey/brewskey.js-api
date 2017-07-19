// @flow
import type { Device, DeviceMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DeviceTranslator from '../translators/DeviceTranslator';

class DeviceDAO extends DAO<Device, DeviceMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.DEVICES,
      navigationProperties: {
        createdBy: ['id', 'userName'],
        lastEditedBy: ['id', 'userName'],
        location: ['id', 'name'],
        organization: ['id', 'name'],
      },
      translator: new DeviceTranslator(),
    });
  }
}

export default new DeviceDAO();
