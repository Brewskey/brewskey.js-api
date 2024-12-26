import { AuthResponse } from './Auth';
import type { EntityID } from './types';

class Config {
  static host: string | null | undefined = null;

  static organizationId: EntityID | null | undefined = null;

  static token: string | null | undefined = null;

  static refreshToken: string | null | undefined = null;

  static onSessionUpdated: ((session: AuthResponse) => void) | null;
}

export default Config;
