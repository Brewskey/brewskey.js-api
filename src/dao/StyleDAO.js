// @flow

import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Style = {|
  abvMax: number,
  abvMin: number,
  createDate: Date,
  description: ?string,
  fgMax: number,
  fgMin: number,
  ibuMax: number,
  ibuMin: number,
  id: EntityID,
  name: string,
  ogMax: number,
  ogMin: number,
  srmMax: number,
  srmMin: number,
  updateDate: Date,
|};

class StyleDAO extends ODataDAO<Style, Style> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_STYLES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new StyleDAO();
