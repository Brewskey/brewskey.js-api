// @flow
import type { Srm } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class SrmDAO extends ODataDAO<Srm, Srm> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_SRMS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new SrmDAO();
