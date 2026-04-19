import type { Tap, TapMutator } from '../dao/TapDAO';

import DefaultTranslator from './DefaultTranslator';

class TapsTranslator extends DefaultTranslator<Tap, TapMutator, Tap> {
  fromApi(apiValue: Tap): Tap {
    const cast = super.fromApi(apiValue);
    return {
      ...cast,
      location: this.getEntityIfNotDeleted(cast.location),
    };
  }

  toForm({
    description,
    device,
    disableBadges,
    hideLeaderboard,
    hideStats,
    id,
    isPaymentEnabled,
    location,
    requiresPourPrivilege,
  }: Tap): TapMutator {
    return {
      description,
      deviceId: device && device.id,
      disableBadges,
      hideLeaderboard,
      hideStats,
      id,
      isPaymentEnabled,
      locationId: location && location.id,
      requiresPourPrivilege,
    };
  }
}

export default TapsTranslator;
