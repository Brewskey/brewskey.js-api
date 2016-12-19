// @flow
import type { Beverage } from 'brewskey.js-api';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/BeverageTranslator';

class BeverageDAO extends DAO<Beverage, Beverage> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGES,
      navigationProperties: {
        createdBy: ['id', 'userName'],
      },
      translator: new BeverageTranslator(),
    });
  }
}

export default new BeverageDAO();
