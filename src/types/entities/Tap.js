// @flow
export type Tap = {
  createdDate: string,
  description: ?string,
  device: {
    id: string,
    name: string,
  },
  disableBadges: boolean,
  hideLeaderboard: boolean,
  hideStats: boolean,
  id: string,
  location: {
    id: string,
    name: string,
  },
  name: string,
  requiresPourPrivilege: boolean,
};

export type TapMutator = {
  createdDate: ?string,
  description: ?string,
  deviceId: string,
  disableBadges: boolean,
  hideLeaderboard: boolean,
  hideStats: boolean,
  id: ?string,
  locationId: string,
  name: string,
  requiresPourPrivilege: boolean,
};
