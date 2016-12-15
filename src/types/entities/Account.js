// @flow
export type Account = {
  accessFailedCount: number,
  banned: boolean,
  createdDate: string,
  email: string,
  emailConfirmed: boolean,
  fullName: ?string,
  id: string,
  lockoutEnabled: boolean,
  lockoutEndDateUtc: ?string,
  logins: Object,
  phoneNumber: ?number,
  phoneNumberConfirmed: boolean,
  roles: Object,
  twoFactorEnabled: boolean,
  userName: string,
};
