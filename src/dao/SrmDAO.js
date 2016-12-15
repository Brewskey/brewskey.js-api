// @flow
import type { Srm } from '../types/entities/Srm';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class SrmDAO extends DAO<Srm, Srm> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_SRMS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new SrmDAO();
