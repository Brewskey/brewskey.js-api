// @flow
import type { Availability } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/Default';

class AvailabilityDAO extends DAO<Availability, Availability> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_AVAILABILITIES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AvailabilityDAO();
