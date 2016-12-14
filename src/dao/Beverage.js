// @flow
import type { Beverage } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/Beverage';

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
