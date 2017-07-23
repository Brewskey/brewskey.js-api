// @flow
import type { Location } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import LocationTranslator from '../translators/LocationTranslator';

class LocationDAO extends DAO<Location, Location> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.LOCATIONS,
      navigationProperties: {
        organization: ['id', 'isDeleted', 'name'],
      },
      translator: new LocationTranslator(),
    });
  }
}

export default new LocationDAO();
