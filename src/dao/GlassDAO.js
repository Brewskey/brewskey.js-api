// @flow
import type { Glass } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class GlassDAO extends ODataDAO<Glass, Glass> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_GLASSES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new GlassDAO();
