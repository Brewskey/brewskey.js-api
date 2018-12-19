// @flow

import type { EntityID } from './types';

import fetch from './fetch';

export type UserCredentials = {|
  password: string,
  userName: string,
|};

export type UserRole = 'Administrator' | 'Super Administator';

export type AuthResponse = {|
  accessToken: string,
  email: string,
  expiresAt: Date,
  expiresIn: number,
  id: EntityID,
  issuedAt: Date,
  phoneNumber: string,
  refreshToken: string,
  roles: Array<UserRole>,
  tokenType: string,
  userLogins: Array<string>,
  userName: string,
|};

export type ChangePasswordArgs = {|
  newPassword: string,
  oldPassword: string,
|};

export type RegisterArgs = {|
  email: string,
  password: string,
  userName: string,
|};

const reformatLoginResponse = (response: any): AuthResponse => ({
  ...response,
  accessToken: response.access_token,
  expiresAt: response['.expires'],
  expiresIn: response.expires_in,
  issuedAt: response['.issued'],
  refreshToken: response.refresh_token,
  roles: JSON.parse(response.roles),
  tokenType: response.token_type,
  userLogins: JSON.parse(response.userLogins),
});

class Auth {
  changePassword(changePasswordArgs: ChangePasswordArgs): Promise<Object> {
    return fetch('api/account/change-password/', {
      body: JSON.stringify({
        ...changePasswordArgs,
        confirmPassword: changePasswordArgs.newPassword,
      }),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    });
  }

  fetchRoles(): Promise<Array<UserRole>> {
    return fetch('api/v2/roles/');
  }

  login({ password, userName }: UserCredentials): Promise<AuthResponse> {
    return fetch(`token/`, {
      body: `grant_type=password&userName=${userName}&password=${password}`,
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
    }).then(reformatLoginResponse);
  }

  refreshToken(refreshToken: string): Promise<AuthResponse> {
    return fetch(`token/`, {
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
    }).then(reformatLoginResponse);
  }

  register(registerArgs: RegisterArgs): Promise<void> {
    return fetch('api/account/register/', {
      body: JSON.stringify(registerArgs),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    });
  }

  resetPassword(email: string): Promise<void> {
    return fetch('api/account/reset-password/', {
      body: JSON.stringify({ email }),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    });
  }
}

export default new Auth();
