// @flow

import type {
  Device,
  DeviceMutator,
  EntityID,
  ParticleAttributes,
} from '../index';
import type LoadObject from '../LoadObject';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DeviceTranslator from '../translators/DeviceTranslator';

class DeviceDAO extends ODataDAO<Device, DeviceMutator> {
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

  fetchParticleAttributes(deviceID: EntityID): LoadObject<ParticleAttributes> {
    const funcString = 'Default.particleAttributes()';
    const stringifiedID = deviceID.toString();

    const handler = this.__buildHandler({}, false).find(
      this.__reformatIDValue(stringifiedID),
    );
    handler.func(funcString);

    return this.__fetchCustom(handler, {}, `${funcString}${deviceID}`);
  }
}

export default new DeviceDAO();
