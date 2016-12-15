// @flow
export type PermissionEntityType =
  'devices' |
  'locations' |
  'taps';

export type PermissionType =
  'Administrator'|
  'Edit'|
  'Read'|
  'BannedFromTap';

export type Permission = {
  createdBy: {
    id: string,
    userName: string,
  },
  createdDate: Date,
  device: ?{
    id: string,
    name: string,
  },
  expiresDate: ?Date,
  forUser: {
    id: string,
    userName: string,
  },
  id: string,
  invalid: boolean,
  location: ?{
    id: string,
    name: string,
  },
  permissionType: PermissionType,
  startDate: ?Date,
  tap: ?{
    id: string,
    name: string,
  },
};

export type PermissionMutator = {
  entityId: string,
  entityType: PermissionEntityType,
  expiresDate: ?Date,
  id: ?string,
  permissionType: PermissionType,
  startDate: ?Date,
  userId: string,
};
