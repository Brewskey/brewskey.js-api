// @flow
import type { Location, LocationMutator } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import LocationTranslator from '../translators/LocationTranslator';

class LocationDAO extends ODataDAO<Location, LocationMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.LOCATIONS,
      navigationProperties: {
        organization: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new LocationTranslator(),
    });
  }
}

export default new LocationDAO();
