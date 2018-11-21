// @flow

import type { EntityID } from '../types';

import RestDAO from './RestDAO';

export type ProductFirmware = {
  current: boolean,
  description?: string,
  deviceCount: number,
  id: EntityID,
  name: string,
  productId: string,
  size: number,
  title: string,
  updatedAt: Date,
  version: number,
};

export type ProductFirmwareMutator = {
  binary?: Buffer,
  current?: boolean,
  description?: string,
  title?: string,
  version?: string,
};

class ProductFirmwareDAO extends RestDAO<
  ProductFirmware,
  ProductFirmwareMutator,
> {
  count(productIdOrSlug: string) {
    return this.__count(`products/${productIdOrSlug}/firmwares/count`);
  }

  getOne(productIdOrSlug: string, id: EntityID) {
    return this.__getOne(`products/${productIdOrSlug}/firmwares/${id}/`, id);
  }

  getMany(productIdOrSlug: string, queryOptions?: Object = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(
      `products/${productIdOrSlug}/firmwares/?skip=${skip}&take=${take}`,
    );
  }

  post(productIdOrSlug: string, mutator: any) {
    const formData = new FormData();
    formData.append('file', (mutator.binary: any));
    formData.append('isCurrent', (false: any));
    formData.append('description', (mutator.description: any));
    formData.append('title', (mutator.title: any));
    formData.append('version', (mutator.version: any));

    return this.__post(`products/${productIdOrSlug}/firmwares/`, mutator, {
      body: formData,
      headers: [],
      method: 'POST',
    });
  }

  // todo this probably wrong  ^.^, i think it basically should be used
  // as `release` product firmware, but why do we need to complex
  // arguments here then...
  updateProductFirmware(
    productIdOrSlug: string,
    firmwareId: string,
    firmwareVersion: string,
    mutator: any,
  ) {
    return this.__put(
      `products/${productIdOrSlug}/firmware/${firmwareVersion}`,
      firmwareId,
      mutator,
    );
  }

  delete(productIdOrSlug: string, firmwareId: string) {
    return this.__delete(
      `products/${productIdOrSlug}/firmware/${firmwareId}/`,
      firmwareId,
    );
  }
}

export default new ProductFirmwareDAO();
