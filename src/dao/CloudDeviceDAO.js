// @flow

import RestDAO from './RestDAO';

class CloudDeviceDAO extends RestDAO<any, any> {
  get(particleId: string) {
    return this.__fetchOnce(`cloud-devices/${particleId}/`);
  }

  flash(particleId: string, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    // todo queryParams
    return this.__fetchOnce(`cloud-devices/${particleId}/flash/`, {
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
    return this.__fetchOnce(`cloud-devices/${particleId}/ping/`, {
      method: 'PUT',
    });
  }
}

export default CloudDeviceDAO;
