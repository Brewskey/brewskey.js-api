// @flow

import RestDAO from './RestDAO';

class ProductDAO extends RestDAO {
  deleteByID(idOrSlug: string) {
    return this.__delete(`products/${idOrSlug}`, idOrSlug);
  }

  fetchProducts() {
    return this.__fetchMany('products');
  }

  fetchProduct(idOrSlug: string) {
    return this.__fetchOne(`products/${idOrSlug}`, idOrSlug);
  }

  post(mutator: any) {
    return this.__post('products', mutator);
  }

  put(id: string, mutator: any) {
    return this.__put(`products/${id}`, id, mutator);
  }
}

export default new ProductDAO();
