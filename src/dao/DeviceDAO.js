// @flow
import type { Device } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class DeviceDAO extends DAO<Device, Device> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.DEVICES,
      navigationProperties: {
        createdBy: ['id', 'userName'],
        lastEditedBy: ['id', 'userName'],
      },
      translator: new DefaultTranslator(),
    });
  }
}

export default new DeviceDAO();
