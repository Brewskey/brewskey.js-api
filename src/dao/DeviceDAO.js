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
        createdBy: { select: ['id', 'userName'] },
        lastEditedBy: { select: ['id', 'userName'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new DeviceTranslator(),
    });
  }
}

export default new DeviceDAO();
