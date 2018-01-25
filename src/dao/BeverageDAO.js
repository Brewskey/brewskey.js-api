// @flow
import type { Beverage, BeverageMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/BeverageTranslator';

class BeverageDAO extends DAO<Beverage, BeverageMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGES,
      navigationProperties: {
        availability: { select: ['id', 'name'] },
        createdBy: { select: ['id', 'userName'] },
        glass: { select: ['id', 'name'] },
        srm: { select: ['hex', 'id', 'name'] },
        style: { select: ['id', 'name'] },
      },
      translator: new BeverageTranslator(),
    });
  }
}

export default new BeverageDAO();
