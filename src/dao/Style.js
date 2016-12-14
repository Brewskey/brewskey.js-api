// @flow
import type { Style } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/Default';

class StyleDAO extends DAO<Style, Style> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_STYLES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new StyleDAO();
