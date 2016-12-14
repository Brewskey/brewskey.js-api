// @flow
import type { Srm } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/Default';

class SrmDAO extends DAO<Srm, Srm> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_SRMS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new SrmDAO();
