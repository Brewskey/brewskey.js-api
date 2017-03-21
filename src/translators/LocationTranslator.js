// @flow
import type { Coordinates, Location } from '../index';

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

class LocationTranslator extends DefaultTranslator<Location, Location> {
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
}

export default LocationTranslator;
