// @flow
import type { Device, DeviceMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DeviceTranslator from '../translators/DeviceTranslator';

class DeviceDAO extends DAO<Device, DeviceMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.DEVICES,
      navigationProperties: [
        { name: 'createdBy', select: ['id', 'userName'] },
        { name: 'lastEditedBy', select: ['id', 'userName'] },
        { name: 'location', select: ['id', 'isDeleted', 'name'] },
        { name: 'organization', select: ['id', 'isDeleted', 'name'] },
      ],
      translator: new DeviceTranslator(),
    });
  }
}

export default new DeviceDAO();
