// @flow
import type { Pour } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PourTranslator from '../translators/PourTranslator';

class PourDAO extends DAO<Pour, Pour> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: [
        { name: 'beverage', select: ['id', 'isDeleted', 'name'] },
        { name: 'location', select: ['id', 'isDeleted', 'name'] },
        { name: 'organization', select: ['id', 'isDeleted', 'name'] },
        { name: 'owner', select: ['id', 'userName'] },
        { name: 'tap', select: ['id', 'isDeleted'] },
      ],
      translator: new PourTranslator(),
    });
  }
}

export default new PourDAO();
