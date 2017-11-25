// @flow
import type { Beverage } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/BeverageTranslator';

class BeverageDAO extends DAO<Beverage, Beverage> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGES,
      selectExpandQuery: {
        expand: {
          availability: ['id', 'name'],
          createdBy: ['id', 'userName'],
          glass: ['id', 'name'],
          srm: ['hex', 'id', 'name'],
          style: ['id', 'name'],
        },
      },
      translator: new BeverageTranslator(),
    });
  }
}

export default new BeverageDAO();
