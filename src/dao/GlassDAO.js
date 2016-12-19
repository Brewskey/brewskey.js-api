// @flow
import type { Glass } from 'brewskey.js-api';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class GlassDAO extends DAO<Glass, Glass> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_GLASSES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new GlassDAO();
