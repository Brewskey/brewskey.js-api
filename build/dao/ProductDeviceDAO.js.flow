// @flow

import type { EntityID } from '../types';

import RestDAO from './RestDAO';

export type ProductDevice = {
  denied: boolean,
  desiredFirmwareVersion: ?number,
  development: boolean,
  functions: Array<Object>,
  id: EntityID,
  lastHeard: Date,
  lastIpAddress: string,
  name: string,
  notes: string,
  platformId: string,
  productId: string,
  quarantined: boolean,
  status: string,
  variables: ?Object,
};

export type ProductDeviceMutator = {
  denied?: boolean,
  desiredFirmwareVersion?: ?number,
  development?: boolean,
  notes?: ?string,
  quarantined?: boolean,
};

class ProductDeviceDAO extends RestDAO<ProductDevice, ProductDeviceMutator> {
  count(productIdOrSlug: string) {
    return this.__count(`products/${productIdOrSlug}/devices/count`);
  }

  getMany(productIdOrSlug: string, queryOptions?: Object = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(
      `products/${productIdOrSlug}/devices/?skip=${skip}&take=${take}`,
    );
  }

  getOne(productIdOrSlug: string, particleId: string) {
    return this.__getOne(
      `products/${productIdOrSlug}/devices/${particleId}/`,
      particleId,
    );
  }

  addToProduct(productIdOrSlug: string, deviceMutator: any) {
    const { file, particleId } = deviceMutator;
    let body;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('importMethod', 'many');
      body = formData;
    } else {
      body = JSON.stringify({ importMethod: 'one', particleId });
    }

    return this.__fetchOne(`products/${productIdOrSlug}/devices/`, {
      body,
      headers: file
        ? []
        : [
            { name: 'Accept', value: 'application/json' },
            { name: 'Content-Type', value: 'application/json' },
          ],
      method: 'POST',
    });
  }

  put(productIdOrSlug: string, particleId: string, deviceMutator: any) {
    return this.__put(
      `products/${productIdOrSlug}/devices/${particleId}/`,
      particleId,
      deviceMutator,
    );
  }

  delete(productIdOrSlug: string, particleId: string) {
    return this.__delete(
      `products/${productIdOrSlug}/devices/${particleId}`,
      particleId,
    );
  }
}

export default new ProductDeviceDAO();
