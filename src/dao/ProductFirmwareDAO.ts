import type { EntityID } from '../types';

import RestDAO, { GetManyParams } from './RestDAO';

export type ProductFirmware = {
  current: boolean;
  description?: string;
  deviceCount: number;
  id: EntityID;
  name: string;
  productId: string;
  size: number;
  title: string;
  updatedAt: Date;
  version: number;
};

export type ProductFirmwareMutator = {
  binary?: number[];
  description?: string;
  isCurrent?: boolean;
  title?: string;
  version?: string;
};

class ProductFirmwareDAOImpl extends RestDAO<
  ProductFirmware,
  ProductFirmwareMutator
> {
  constructor() {
    super({ entityName: 'product-firmwares' });
  }

  count(productIdOrSlug: string) {
    return this.__count(`api/v2/products/${productIdOrSlug}/firmwares/count`);
  }

  getOne(productIdOrSlug: string, id: EntityID) {
    return this.__getOne(`api/v2/products/${productIdOrSlug}/firmwares/${id}/`);
  }

  getMany(productIdOrSlug: string, queryOptions: GetManyParams = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(
      `api/v2/products/${productIdOrSlug}/firmwares/?skip=${skip}&take=${take}`,
    );
  }

  post(productIdOrSlug: string, mutator: Record<string, unknown>) {
    return this.__post(
      `api/v2/products/${productIdOrSlug}/firmwares/`,
      mutator,
      {
        reformatError: (error) => error.error,
      },
    );
  }

  updateProductFirmware(
    productIdOrSlug: string,
    firmwareVersion: number,
    mutator: ProductFirmwareMutator,
  ) {
    return this.__put(
      `api/v2/products/${productIdOrSlug}/firmwares/${firmwareVersion}`,
      mutator,
    );
  }

  delete(productIdOrSlug: string, firmwareVersion: number) {
    return this.__delete(
      `api/v2/products/${productIdOrSlug}/firmwares/${firmwareVersion}/`,
    );
  }
}

export const ProductFirmwareDAO = new ProductFirmwareDAOImpl();
