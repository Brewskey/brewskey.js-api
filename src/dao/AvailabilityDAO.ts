import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Availability = {
  description: string | null | undefined;
  id: EntityID;
  name: string;
};

class AvailabilityDAOImpl extends ODataDAO<Availability, Availability> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGE_AVAILABILITIES,
      translator: new DefaultTranslator(),
    });
  }
}

export const AvailabilityDAO = new AvailabilityDAOImpl();
