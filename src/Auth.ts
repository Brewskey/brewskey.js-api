import type { EntityID } from './types';

import fetch from './fetch';

export type UserCredentials = {
  password: string;
  userName: string;
};

export type UserRole = 'Administrator' | 'Super Administator';

export type AuthResponse = {
  accessToken: string;
  email: string;
  expiresAt: Date;
  expiresIn: number;
  id: EntityID;
  issuedAt: Date;
  isNewAccount: boolean;
  phoneNumber: string;
  refreshToken: string;
  roles: Array<UserRole>;
  tokenType: string;
  userLogins: Array<string>;
  userName: string;
};

export type ChangePasswordArgs = {
  newPassword: string;
  oldPassword: string;
};

export type SetPasswordArgs = {
  newPassword: string;
};

export type RegisterArgs = {
  email: string;
  password: string;
  userName: string;
};

export type ExternalLoginProvider = 'Google' | 'Apple';

export type LinkExternalArgs = {
  provider: ExternalLoginProvider;
  idToken: string;
  /** Apple-only — forwarded so the backend can exchange it for an Apple
   * refresh token on first sign-in (used later for token revocation). */
  authorizationCode?: string | null;
  /** Apple-only — Apple sends the user's full name only on first sign-in. */
  fullName?: string | null;
};

export type LinkResult = {
  merged: boolean;
  mergedFromAccountId?: EntityID;
  alreadyLinked?: boolean;
};

export type UserLoginInfo = {
  loginProvider: string;
  providerKey: string;
};

export type ManageInfo = {
  userName: string;
  localLoginProvider: string;
  logins: Array<UserLoginInfo>;
};

type LoginResponse = {
  email: string;
  id: string;
  phoneNumber: string;
  userName: string;
  access_token: string;
  '.expires': Date;
  expires_in: number;
  '.issued': Date;
  refresh_token: string;
  isNewAccount?: boolean | string;
  roles: string;
  token_type: string;
  userLogins: string;
};

// Wire format from /api/Account/ManageInfo (Pascal-cased ASP.NET response).
type ManageInfoResponse = {
  LocalLoginProvider: string;
  UserName: string;
  Logins: Array<{ LoginProvider: string; ProviderKey: string }>;
};

// Wire format from /api/account/link-external (Pascal-cased ASP.NET response).
type LinkResultResponse = {
  Merged: boolean;
  MergedFromAccountId?: EntityID;
  AlreadyLinked?: boolean;
};

const reformatLoginResponse = (response: LoginResponse): AuthResponse => ({
  ...response,
  accessToken: response.access_token,
  expiresAt: response['.expires'],
  expiresIn: response.expires_in,
  issuedAt: response['.issued'],
  isNewAccount: response.isNewAccount === true || response.isNewAccount === 'true',
  refreshToken: response.refresh_token,
  roles: JSON.parse(response.roles),
  tokenType: response.token_type,
  userLogins: JSON.parse(response.userLogins),
});

const reformatManageInfoResponse = (
  response: ManageInfoResponse,
): ManageInfo => ({
  userName: response.UserName,
  localLoginProvider: response.LocalLoginProvider,
  logins: (response.Logins ?? []).map((login) => ({
    loginProvider: login.LoginProvider,
    providerKey: login.ProviderKey,
  })),
});

const reformatLinkResultResponse = (
  response: LinkResultResponse,
): LinkResult => ({
  merged: response.Merged,
  mergedFromAccountId: response.MergedFromAccountId,
  alreadyLinked: response.AlreadyLinked,
});

export const LAST_LOGIN_METHOD_ERROR = 'last_login_method' as const;

export const EXTERNAL_LOGIN_ALREADY_LINKED_ERROR =
  'external_login_already_linked' as const;
export const EXTERNAL_PROVIDER_ALREADY_LINKED_ERROR =
  'external_provider_already_linked' as const;

export type ExternalLoginConflictCode =
  | typeof EXTERNAL_LOGIN_ALREADY_LINKED_ERROR
  | typeof EXTERNAL_PROVIDER_ALREADY_LINKED_ERROR;

class AuthImpl {
  changePassword(
    changePasswordArgs: ChangePasswordArgs,
  ): Promise<Record<string, never>> {
    return fetch('api/account/change-password/', {
      body: JSON.stringify({
        ...changePasswordArgs,
        confirmPassword: changePasswordArgs.newPassword,
      }),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    });
  }

  setPassword(setPasswordArgs: SetPasswordArgs): Promise<Record<string, never>> {
    return fetch('api/Account/SetPassword', {
      body: JSON.stringify({
        NewPassword: setPasswordArgs.newPassword,
        ConfirmPassword: setPasswordArgs.newPassword,
      }),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    });
  }

  /**
   * Permanently anonymizes the current user's account (`DELETE /api/account`).
   * The backend scrubs PII in place (email/username/phone/name), clears the
   * password hash, regenerates the security stamp (invalidating outstanding
   * tokens), removes all linked external logins, and — if the account had
   * previously signed in with Apple — calls Apple's `/auth/revoke` endpoint
   * with the stored Apple refresh token (required by App Review).
   *
   * Past pours / achievements / breakdowns remain attached to the now-
   * anonymized Account row so leaderboards and shared history stay intact;
   * the deleted user just renders as anonymous in the UI.
   */
  deleteAccount(): Promise<void> {
    return fetch('api/account', {
      method: 'DELETE',
    });
  }

  fetchRoles(): Promise<Array<UserRole>> {
    return fetch('api/v2/roles/');
  }

  /**
   * Returns the current user's linked-account info (local login + external
   * provider logins). Wraps the existing `GET /api/Account/ManageInfo`
   * endpoint, transforming its Pascal-cased response into the camelCase
   * shape used by the rest of the js-api.
   */
  getManageInfo(): Promise<ManageInfo> {
    return fetch<ManageInfoResponse>('api/Account/ManageInfo?returnUrl=%2F').then(
      reformatManageInfoResponse,
    );
  }

  /**
   * Links an external sign-in identity (Google or Apple) to the currently
   * signed-in Brewskey account via `POST /api/account/link-external`.
   *
   * If the (provider, sub) is not yet associated with any Brewskey account,
   * the backend simply adds the login. If it already belongs to a different
   * Brewskey account, the backend re-parents all of that other account's
   * data (pours, achievements, friends, audit FKs, identity rows...) onto
   * the current account in a single transaction and deletes the source —
   * this lets users silently merge an auto-provisioned duplicate profile.
   *
   * @returns `{ merged }` plus `mergedFromAccountId` when a merge occurred
   *   and `alreadyLinked: true` when the provider was already linked to the
   *   current account (no-op).
   */
  linkExternal(args: LinkExternalArgs): Promise<LinkResult> {
    return fetch<LinkResultResponse>('api/account/link-external', {
      body: JSON.stringify({
        provider: args.provider,
        idToken: args.idToken,
        authorizationCode: args.authorizationCode ?? null,
        fullName: args.fullName ?? null,
      }),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    }).then(reformatLinkResultResponse);
  }

  /** Thin wrapper over {@link linkExternal} so calling code reads naturally. */
  linkGoogle(idToken: string): Promise<LinkResult> {
    return this.linkExternal({ provider: 'Google', idToken });
  }

  /** Thin wrapper over {@link linkExternal} so calling code reads naturally. */
  linkApple(
    idToken: string,
    fullName?: string | null,
    authorizationCode?: string | null,
  ): Promise<LinkResult> {
    return this.linkExternal({
      provider: 'Apple',
      idToken,
      fullName,
      authorizationCode,
    });
  }

  login({ password, userName }: UserCredentials): Promise<AuthResponse> {
    return fetch<LoginResponse>('token/', {
      body: `grant_type=password&userName=${userName}&password=${password}`,
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
    }).then(reformatLoginResponse);
  }

  /**
   * Exchanges an Apple identity token for a Brewskey AuthResponse via the
   * `apple_id_token` custom OAuth grant on the backend (handled in
   * `ApplicationOAuthProvider.GrantCustomExtension`). The backend validates
   * the JWT signature against Apple's JWKS, checks audience/issuer, then
   * either looks up an existing Apple-linked Account, links the Apple
   * identity to an existing local account by verified email, or
   * auto-provisions a new Account.
   *
   * @param identityToken JWT issued by Apple (from `expo-apple-authentication`'s
   *   `signInAsync()` result).
   * @param fullName Apple sends the user's full name only on the very first
   *   sign-in; pass it through so the backend can populate `Account.FullName`.
   * @param authorizationCode Apple's short-lived authorization code, also only
   *   present on first sign-in. The backend exchanges it for a refresh token
   *   on first sign-in (when `Account.AppleRefreshToken` is null) and stores
   *   it for the eventual token-revocation call required by App Review when
   *   the account is deleted. Subsequent sign-ins ignore it.
   */
  loginWithApple(
    identityToken: string,
    fullName?: string | null,
    authorizationCode?: string | null,
  ): Promise<AuthResponse> {
    const params = new URLSearchParams({
      grant_type: 'apple_id_token',
      id_token: identityToken,
    });
    if (fullName) {
      params.set('full_name', fullName);
    }
    if (authorizationCode) {
      params.set('authorization_code', authorizationCode);
    }
    return fetch<LoginResponse>('token/', {
      body: params.toString(),
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
    }).then(reformatLoginResponse);
  }

  /**
   * Exchanges a Google ID token for a Brewskey AuthResponse via the
   * `google_id_token` custom OAuth grant on the backend (handled in
   * `ApplicationOAuthProvider.GrantCustomExtension`). The backend validates
   * the token's signature & audience, then either looks up an existing
   * Google-linked Account, links the Google identity to an existing local
   * account by verified email, or auto-provisions a new Account.
   *
   * @param idToken JWT issued by Google (e.g. from
   *   `@react-native-google-signin/google-signin`'s `signIn()` result).
   */
  loginWithGoogle(idToken: string): Promise<AuthResponse> {
    return fetch<LoginResponse>('token/', {
      body: `grant_type=google_id_token&id_token=${encodeURIComponent(idToken)}`,
      headers: [
        { name: 'Content-type', value: 'application/x-www-form-urlencoded' },
      ],
      method: 'POST',
    }).then(reformatLoginResponse);
  }

  refreshToken(refreshToken: string): Promise<AuthResponse> {
    return fetch<LoginResponse>('token/', {
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

  /**
   * Removes the specified external login from the current account
   * (`POST /api/Account/RemoveLogin`).
   *
   * On failure the thrown {@link Error} includes `status` and `body` (see
   * `fetch.ts`) so callers can inspect e.g.
   * `400 { error: 'last_login_method', Message: '...' }` near the UI.
   */
  unlinkLogin(loginProvider: string, providerKey: string): Promise<void> {
    return fetch('api/Account/RemoveLogin', {
      body: JSON.stringify({
        providerName: loginProvider,
        providerKey,
      }),
      headers: [{ name: 'Content-type', value: 'application/json' }],
      method: 'POST',
    });
  }
}

export const Auth = new AuthImpl();
