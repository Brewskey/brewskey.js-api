// @flow
import type { Organization } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class OrganizationDAO extends DAO<Organization, Organization> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ORGANIZATIONS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new OrganizationDAO();
