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
  description?: string,
  isCurrent?: boolean,
  title?: string,
  version?: string,
};

class ProductFirmwareDAO extends RestDAO<
  ProductFirmware,
  ProductFirmwareMutator,
> {
  count(productIdOrSlug: string) {
    return this.__count(`api/v2/products/${productIdOrSlug}/firmwares/count`);
  }

  getOne(productIdOrSlug: string, id: EntityID) {
    return this.__getOne(
      `api/v2/products/${productIdOrSlug}/firmwares/${id}/`,
      id,
    );
  }

  getMany(productIdOrSlug: string, queryOptions?: Object = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(
      `api/v2/products/${productIdOrSlug}/firmwares/?skip=${skip}&take=${take}`,
    );
  }

  post(productIdOrSlug: string, mutator: any) {
    return this.__post(
      `api/v2/products/${productIdOrSlug}/firmwares/`,
      mutator,
      {
        reformatError: error => error.error,
      },
    );
  }

  updateProductFirmware(
    productIdOrSlug: string,
    firmwareId: EntityID,
    firmwareVersion: number,
    mutator: ProductFirmwareMutator,
  ) {
    return this.__put(
      `api/v2/products/${productIdOrSlug}/firmwares/${firmwareVersion}`,
      firmwareId,
      mutator,
    );
  }

  delete(
    productIdOrSlug: string,
    firmwareId: EntityID,
    firmwareVersion: number,
  ) {
    return this.__delete(
      `api/v2/products/${productIdOrSlug}/firmwares/${firmwareVersion}/`,
      firmwareId,
    );
  }
}

export default new ProductFirmwareDAO();
