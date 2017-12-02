// @flow
import type { Location, LocationMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import LocationTranslator from '../translators/LocationTranslator';

class LocationDAO extends DAO<Location, LocationMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.LOCATIONS,
      selectExpandQuery: {
        expand: {
          organization: ['id', 'isDeleted', 'name'],
        },
      },
      translator: new LocationTranslator(),
    });
  }
}

export default new LocationDAO();
