import type {EntityID} from './types';

class Config {
  static host: string | null | undefined = null;

  static organizationId: EntityID | null | undefined = null;

  static token: string | null | undefined = null;
}

export default Config;
