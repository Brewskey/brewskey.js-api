// @flow
import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Organization = {
  createdDate: Date,
  id: EntityID,
  isDeleted: boolean,
  name: string,
};

class OrganizationDAO extends ODataDAO<Organization, Organization> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ORGANIZATIONS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new OrganizationDAO();
