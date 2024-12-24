import type { EntityID } from '../types';

import RestDAO, { GetManyParams } from './RestDAO';

export type ProductPlatformId = '0' | '6' | '8' | '10' | '103';

export type ProductPlatformName =
  | 'Bluz'
  | 'Core'
  | 'Electron'
  | 'P1'
  | 'Photon';

export type ProductType = 'Consumer' | 'Industrial' | 'Hobbyist';

export type Product = {
  configId: string;
  createdAt: Date;
  description: string;
  hardwareVersion: string;
  id: EntityID;
  name: string;
  organization: string;
  platformId: ProductPlatformId;
  slug: string;
  type: ProductType;
};

export const PLATFORM_NAME_BY_ID: Partial<
  Record<ProductPlatformId, ProductPlatformName>
> = {
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

export type ProductMutator = Record<string, never>;

class ProductDAOImpl extends RestDAO<Product, ProductMutator> {
  constructor() {
    super({ entityName: 'products' });
  }

  count() {
    return this.__count('api/v2/products/count');
  }

  getMany(queryOptions: GetManyParams = {}) {
    const { skip, take } = queryOptions;
    return this.__getMany(`api/v2/products/?skip=${skip}&take=${take}`);
  }

  getOne(idOrSlug: string) {
    return this.__getOne(`api/v2/products/${idOrSlug}/`);
  }

  post(mutator: ProductMutator) {
    return this.__post('api/v2/products/', mutator);
  }

  put(id: string, mutator: ProductMutator) {
    return this.__put(`api/v2/products/${id}/`, mutator);
  }

  delete(idOrSlug: string) {
    return this.__delete(`api/v2/products/${idOrSlug}`);
  }
}

export const ProductDAO = new ProductDAOImpl();
