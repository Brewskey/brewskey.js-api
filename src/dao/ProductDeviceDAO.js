// @flow

import RestDAO from './RestDAO';

class ProductDeviceDAO extends RestDAO<*, *> {
  getMany(productIdOrSlug: string) {
    return this.__getMany(`products/${productIdOrSlug}/devices/`);
  }

  getOne(productIdOrSlug: string, particleId: string) {
    return this.__getOne(
      `products/${productIdOrSlug}/devices/${particleId}/`,
      particleId,
    );
  }

  post(productIdOrSlug: string, deviceMutator: any) {
    return this.__post(`products/${productIdOrSlug}/devices/`, deviceMutator);
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

export default ProductDeviceDAO;
