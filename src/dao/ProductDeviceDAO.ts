import type { EntityID } from '../types';

import RestDAO, { GetManyParams } from './RestDAO';

export type ProductDevice = {
  denied: boolean;
  desiredFirmwareVersion: number | null | undefined;
  development: boolean;
  functions: Array<string>;
  id: EntityID;
  lastHeard: Date;
  lastIpAddress: string;
  name: string;
  notes: string;
  platformId: string;
  productId: string;
  quarantined: boolean;
  status: string;
  variables: Record<string, unknown> | null | undefined;
};

export type ProductDeviceMutator = {
  denied?: boolean;
  desiredFirmwareVersion?: number | null | undefined;
  development?: boolean;
  notes?: string | null | undefined;
  quarantined?: boolean;
};

class ProductDeviceDAOImpl extends RestDAO<
  ProductDevice,
  ProductDeviceMutator
> {
  constructor() {
    super({ entityName: 'product-devices' });
  }

  count(productIdOrSlug: string) {
    return this.__count(`api/v2/products/${productIdOrSlug}/devices/count`);
  }

  getMany(productIdOrSlug: string, queryOptions: GetManyParams = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(
      `api/v2/products/${productIdOrSlug}/devices/?skip=${skip}&take=${take}`,
    );
  }

  getOne(productIdOrSlug: string, particleId: string) {
    return this.__getOne(
      `api/v2/products/${productIdOrSlug}/devices/${particleId}/`,
    );
  }

  addToProduct(
    productIdOrSlug: string,
    payload: { file: File; particleId: string },
  ) {
    const { file, particleId } = payload;
    return this.__fetchOne(`api/v2/products/${productIdOrSlug}/devices/`, {
      body: JSON.stringify({
        file,
        importMethod: file ? 'many' : 'one',
        particleId,
      }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'POST',
      reformatError: (error) =>
        `invalid device ids: ${error.invalidDeviceIds.join(', ')}`,
    });
  }

  put(productIdOrSlug: string, particleId: string, deviceMutator: never) {
    return this.__put(
      `api/v2/products/${productIdOrSlug}/devices/${particleId}/`,
      deviceMutator,
    );
  }

  delete(productIdOrSlug: string, particleId: string) {
    return this.__delete(
      `api/v2/products/${productIdOrSlug}/devices/${particleId}`,
    );
  }
}

export const ProductDeviceDAO = new ProductDeviceDAOImpl();
