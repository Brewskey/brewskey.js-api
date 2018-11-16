// @flow

import type { EntityID } from '../types';

import RestDAO from './RestDAO';

export type ProductPlatformId = '0' | '6' | '8' | '10' | '103';

export type ProductPlatformName =
  | 'Bluz'
  | 'Core'
  | 'Electron'
  | 'P1'
  | 'Photon';

export type ProductType = 'Consumer' | 'Industrial' | 'Hobbyist';

export type Product = {
  configId: string,
  createdAt: Date,
  description: string,
  hardwareVersion: string,
  id: EntityID,
  name: string,
  organization: string,
  platformId: ProductPlatformId,
  slug: string,
  type: ProductType,
};

export const PLATFORM_NAME_BY_ID: {
  [key: ProductPlatformId]: ProductPlatformName,
} = {
  '0': 'Core',
  '10': 'Electron',
  '103': 'Bluz',
  '6': 'Photon',
  '8': 'P1',
};

export const PRODUCT_TYPES: Array<ProductType> = [
  'Consumer',
  'Hobbyist',
  'Industrial',
];

class ProductDAO extends RestDAO<Product, *> {
  count() {
    return this.__count('products/count');
  }

  getMany(queryOptions?: Object = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(`products/?skip=${skip}&take=${take}`);
  }

  getOne(idOrSlug: string) {
    return this.__getOne(`products/${idOrSlug}/`, idOrSlug);
  }

  post(mutator: any) {
    return this.__post('products/', mutator);
  }

  put(id: string, mutator: any) {
    return this.__put(`products/${id}/`, id, mutator);
  }

  delete(idOrSlug: string) {
    return this.__delete(`products/${idOrSlug}`, idOrSlug);
  }
}

export default new ProductDAO();
