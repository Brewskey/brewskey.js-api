// @flow
import type { Availability } from 'brewskey.js-api';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class AvailabilityDAO extends DAO<Availability, Availability> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_AVAILABILITIES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AvailabilityDAO();
