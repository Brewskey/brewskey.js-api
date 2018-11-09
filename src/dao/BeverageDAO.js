// @flow
import type { Beverage, BeverageMutator } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/BeverageTranslator';

class BeverageDAO extends ODataDAO<Beverage, BeverageMutator> {
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
