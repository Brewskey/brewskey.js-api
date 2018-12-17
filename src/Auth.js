// @flow

import type { EntityID } from './types';

import fetch from './fetch';

export type UserCredentials = {|
  password: string,
  userName: string,
|};

export type UserRole = 'Administrator' | 'Super Administator';

export type AuthResopnse = {|
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

const reformatLoginResponse = (response: any): AuthResopnse => ({
  ...response,
  accessToken: response.access_token,
  expiresAt: response['.expires'],
  expiresIn: response.expires_in,
  issuedAt: response['.issued'],
  refreshToken: response.refresh_token,
  tokenType: response.token_type,
});

class Auth {
  fetchRoles(): Promise<Array<UserRole>> {
    return fetch('api/v2/roles/');
  }

  login({ password, userName }: UserCredentials): Promise<AuthResopnse> {
    return fetch(`token/`, {
      body: `grant_type=password&userName=${userName}&password=${password}`,
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
      reformatError: error => error.error_description,
    }).then(reformatLoginResponse);
  }

  refreshToken(refreshToken: string): Promise<any> {
    return fetch(`token/`, {
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
      reformatError: error => error.error_description,
    }).then(reformatLoginResponse);
  }
}

export default new Auth();
