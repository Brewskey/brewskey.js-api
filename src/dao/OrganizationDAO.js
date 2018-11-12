// @flow
import type { Organization } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class OrganizationDAO extends ODataDAO<Organization, Organization> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ORGANIZATIONS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new OrganizationDAO();
