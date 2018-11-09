// @flow
import type { Style } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class StyleDAO extends ODataDAO<Style, Style> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_STYLES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new StyleDAO();
