// @flow

import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Availability = {|
  description: ?string,
  id: EntityID,
  name: string,
|};

class AvailabilityDAO extends ODataDAO<Availability, Availability> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_AVAILABILITIES,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AvailabilityDAO();
