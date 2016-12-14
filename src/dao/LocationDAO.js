// @flow
import type { Location } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class LocationDAO extends DAO<Location, Location> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.LOCATIONS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new LocationDAO();
