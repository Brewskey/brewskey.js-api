// @flow

import type { EntityID } from '../types';

import RestDAO from './RestDAO';

class CloudDeviceDAO extends RestDAO<any, any> {
  fetch(particleId: string) {
    return this.__fetchOne(`cloud-devices/${particleId}/`);
  }

  flash(particleId: string, file: any) {
    return this.__fetchOne(`cloud-devices/${particleId}/flash/`, {
      body: JSON.stringify({ file, particleId }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'PUT',
      reformatError: error => error.error,
    });
  }

  ping(particleId: string) {
    return this.__fetchOne(`cloud-devices/${particleId}/ping/`, {
      method: 'PUT',
    });
  }

  get(clientId: EntityID) {
    return this.__getOne('', clientId);
  }

  getPing(particleId: string) {
    return this.__getOne(`cloud-devices/${particleId}/ping/`, particleId, {
      method: 'PUT',
    });
  }
}

export default new CloudDeviceDAO();
