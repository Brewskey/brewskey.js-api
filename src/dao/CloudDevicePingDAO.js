// @flow

import RestDAO from './RestDAO';
import LoadObject from '../LoadObject';

export type CloudDevicePing = {
  connected: boolean,
  lastPing: ?Date,
};

class CloudDevicePingDAO extends RestDAO<CloudDevicePing, CloudDevicePing> {
  getPing(particleId: string) {
    return this.__getOne(
      `api/v2/cloud-devices/${particleId}/ping/`,
      particleId,
      {
        method: 'PUT',
      },
    );
  }

  updatePing(particleId: string, pingPayload: CloudDevicePing) {
    // todo make _entityLoaderByID protected?
    return this._entityLoaderById.set(
      particleId,
      LoadObject.withValue(pingPayload),
    );
  }
}

export default new CloudDevicePingDAO();
