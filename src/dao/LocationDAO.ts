import type { EntityID, QueryOptions, ShortenedEntity } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import LocationTranslator from '../translators/LocationTranslator';
import { KegType } from './KegDAO';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Location = {
  city: string;
  createdDate: Date;
  description: string | null | undefined;
  geolocation?: {
    coordinates: Coordinates;
    geography: {
      coordinateSystemId: number;
      wellKnownBinary: Buffer | null | undefined;
      wellKnownText: string;
    };
  };
  id: EntityID;
  isDeleted: boolean;
  locationType: string;
  name: string;
  organization: ShortenedEntity;
  squareLocationID: string;
  state: string | null | undefined;
  street: string;
  suite: string;
  timeZone: string;
  zipCode: number;
};

export type LocationMutator = {
  city: string;
  description: string | null | undefined;
  id: EntityID | null | undefined;
  locationType: string;
  name: string;
  organizationId?: EntityID;
  squareLocationID: string;
  state: string | null | undefined;
  street: string;
  suite: string;
  zipCode: number;
};

export type NearbyLocation = {
  id: EntityID;
  name: string;
  summary: string | null | undefined;
  taps: Array<NearbyTap>;
};

export type NearbyTap = {
  currentKeg: {
    beverageId: number; // not translated to string,
    beverageName: string;
    kegType: KegType;
    maxOunces: number;
    ounces: number;
  };
  device: {
    id: number; // not translated to string,
    name: string;
  };
  id: EntityID;
  name: string;
  tapNumber: number;
};

class LocationDAOImpl extends ODataDAO<Location, LocationMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.LOCATIONS,
      navigationProperties: {
        organization: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new LocationTranslator(),
    });
  }

  getNearbyLocations({
    latitude,
    longitude,
    radius,
    ...queryOptions
  }: {
    latitude: number;
    longitude: number;
    radius: number;
  } & QueryOptions): Promise<NearbyLocation[]> {
    const funcString = 'Default.nearby()';

    const handler = this.__buildHandler(queryOptions, false);
    handler.customParam('latitude', latitude.toString());
    handler.customParam('longitude', longitude.toString());
    handler.customParam('radius', radius.toString());
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions);
  }
}

export const LocationDAO = new LocationDAOImpl();
