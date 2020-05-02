// @flow

import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Glass = {|
  createDate: Date,
  description: ?string,
  id: EntityID,
  name: string,
  updateDate: Date,
|};

class GlassDAO extends ODataDAO<Glass, Glass> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_GLASSES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new GlassDAO();
