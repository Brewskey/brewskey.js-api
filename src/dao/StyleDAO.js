// @flow
import type { Style } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class StyleDAO extends DAO<Style, Style> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_STYLES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new StyleDAO();
