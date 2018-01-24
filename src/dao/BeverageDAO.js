// @flow
import type { Beverage } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/BeverageTranslator';

class BeverageDAO extends DAO<Beverage, Beverage> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGES,
      navigationProperties: [{ name: 'createdBy', select: ['id', 'userName'] }],
      translator: new BeverageTranslator(),
    });
  }
}

export default new BeverageDAO();
