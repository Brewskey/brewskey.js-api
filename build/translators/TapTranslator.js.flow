// @flow

import type { Tap, TapMutator } from '../dao/TapDAO';

import DefaultTranslator from './DefaultTranslator';

class TapsTranslator extends DefaultTranslator<Tap, TapMutator> {
  fromApi(apiValue: Object): Tap {
    return (({
      ...super.fromApi(apiValue),
      location:
        apiValue.location && apiValue.location.isDeleted
          ? null
          : apiValue.location,
    }: any): Tap);
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
