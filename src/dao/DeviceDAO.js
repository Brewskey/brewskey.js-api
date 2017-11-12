// @flow
import type { Device, DeviceMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DeviceTranslator from '../translators/DeviceTranslator';

class DeviceDAO extends DAO<Device, DeviceMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.DEVICES,
      selectExpandQuery: {
        expand: {
          createdBy: ['id', 'userName'],
          lastEditedBy: ['id', 'userName'],
          location: ['id', 'isDeleted', 'name'],
          organization: ['id', 'isDeleted', 'name'],
        },
      },
      translator: new DeviceTranslator(),
    });
  }
}

export default new DeviceDAO();
