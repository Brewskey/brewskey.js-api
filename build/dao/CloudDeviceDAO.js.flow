// @flow

import RestDAO from './RestDAO';

export type ParticleAttributes = {
  cellular: ?string,
  connected: boolean,
  currentBuildTarget: ?string,
  functions: Array<string>,
  id: string,
  imei: ?string,
  lastApp: ?string,
  lastHeard: Date,
  lastIccid: ?string,
  lastIpAddress: string,
  name: string,
  platformId: number,
  productFirmwareVersion: number,
  productId: number,
  status: string,
};

class CloudDeviceDAO extends RestDAO<any, any> {
  fetch(particleId: string) {
    return this.__fetchOne(`cloud-devices/${particleId}/`);
  }

  flash(particleId: string, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    // todo queryParams
    return this.__fetchOne(`cloud-devices/${particleId}/flash/`, {
      body: formData,
      headers: [
        {
          name: 'Content-Type',
          value: 'multipart/form-data',
        },
      ],
      method: 'PUT',
    });
  }

  ping(particleId: string) {
    return this.__fetchOne(`cloud-devices/${particleId}/ping/`, {
      method: 'PUT',
    });
  }
}

export default CloudDeviceDAO;
