// @flow

import RestDAO from './RestDAO';

class ProductDAO extends RestDAO {
  // api/v2/products/{idOrSlug}
  deleteByID() {}

  // api/v2/products
  fetchProducts() {
    return this.__fetchMany('products');
  }

  fetchProduct(idOrSlug: string) {
    return this.__fetchOne(`products/${idOrSlug}`, idOrSlug);
  }

  post() {}

  // api/v2/products/{idOrSlug}
  put() {}
}

export default new ProductDAO();
