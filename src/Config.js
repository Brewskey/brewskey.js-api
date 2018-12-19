// @flow

import type { EntityID } from './types';

class Config {
  static host: ?string = null;

  static organizationId: ?EntityID = null;

  static token: ?string = null;
}

export default Config;
