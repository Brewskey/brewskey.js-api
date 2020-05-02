// @flow

import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Srm = {|
  hex: string,
  id: EntityID,
  name: string,
|};

class SrmDAO extends ODataDAO<Srm, Srm> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_SRMS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new SrmDAO();
