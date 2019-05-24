// @flow

import type { EntityID, ShortenedEntity } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import LocationTranslator from '../translators/LocationTranslator';

export type Coordinates = {
  latitude: number,
  longitude: number,
};

export type Location = {
  city: string,
  createdDate: Date,
  description: ?string,
  geolocation?: {
    coordinates: Coordinates,
    geography: {
      coordinateSystemId: number,
      wellKnownBinary: ?Object,
      wellKnownText: string,
    },
  },
  id: EntityID,
  isDeleted: boolean,
  locationType: string,
  name: string,
  organization: ShortenedEntity,
  squareLocationID: string,
  state: ?string,
  street: string,
  suite: string,
  timeZone: string,
  zipCode: number,
};

export type LocationMutator = {
  city: string,
  description: ?string,
  id: ?EntityID,
  locationType: string,
  name: string,
  organizationId?: EntityID,
  squareLocationID: string,
  state: ?string,
  street: string,
  suite: string,
  zipCode: number,
};

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
