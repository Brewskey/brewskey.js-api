// @flow

import RestDAO from './RestDAO';

class ProductDAO extends RestDAO<*, *> {
  getMany() {
    return this.__getMany('products/');
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
