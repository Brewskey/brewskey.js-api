// @flow
import type {
  Coordinates,
  Location,
  LocationMutator,
} from '../dao/LocationDAO';

import DefaultTranslator from './DefaultTranslator';

const FLOAT_REGEXP = /[+-]?([0-9]*[.])?[0-9]+/g;

const parseLocationCoordinates = (wellKnownText: string): Coordinates => {
  const matchedLatLongStringArray = wellKnownText.match(FLOAT_REGEXP);
  if (!matchedLatLongStringArray) {
    return { latitude: 0, longitude: 0 };
  }
  const latLongNumberArray = matchedLatLongStringArray.map(
    (coordinateString: string): number => parseFloat(coordinateString),
  );

  return {
    latitude: latLongNumberArray[1],
    longitude: latLongNumberArray[0],
  };
};

class LocationTranslator extends DefaultTranslator<Location, LocationMutator> {
  fromApi(apiValue: Object): Location {
    return (({
      ...super.fromApi(apiValue),
      geolocation: apiValue.geolocation && {
        ...apiValue.geolocation,
        coordinates: parseLocationCoordinates(
          apiValue.geolocation.geography.wellKnownText,
        ),
      },
    }: any): Location);
  }

  toForm({
    city,
    description,
    id,
    locationType,
    name,
    organization,
    squareLocationID,
    state,
    street,
    suite,
    zipCode,
  }: Location): LocationMutator {
    return {
      city,
      description,
      id,
      locationType,
      name,
      organizationId: organization && organization.id,
      squareLocationID,
      state,
      street,
      suite,
      zipCode,
    };
  }
}

export default LocationTranslator;
