// @flow
import type { Pour } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import PourTranslator from '../translators/PourTranslator';

class PourDAO extends ODataDAO<Pour, Pour> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: { select: ['id', 'isDeleted', 'name'] },
        keg: { select: ['id'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
        owner: { select: ['id', 'userName'] },
        tap: { select: ['id', 'isDeleted'] },
      },
      translator: new PourTranslator(),
    });
  }
}

export default new PourDAO();
