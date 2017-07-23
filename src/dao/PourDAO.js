// @flow
import type { Pour } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PourTranslator from '../translators/PourTranslator';

class PourDAO extends DAO<Pour, Pour> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: ['id', 'isDeleted', 'name'],
        location: ['id', 'isDeleted', 'name'],
        organization: ['id', 'isDeleted', 'name'],
        owner: ['id', 'userName'],
        tap: ['id', 'isDeleted', 'name'],
      },
      translator: new PourTranslator(),
    });
  }
}

export default new PourDAO();
