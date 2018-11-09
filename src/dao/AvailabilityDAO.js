// @flow
import type { Availability } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class AvailabilityDAO extends ODataDAO<Availability, Availability> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_AVAILABILITIES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AvailabilityDAO();
