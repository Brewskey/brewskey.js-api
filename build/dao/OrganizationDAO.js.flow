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

export type OrganizationMutator = {
  id?: EntityID,
  name: string,
};

class OrganizationDAO extends ODataDAO<Organization, OrganizationMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ORGANIZATIONS,
      translator: new DefaultTranslator(),
    });
  }

  addStripeAccount(organizationID: string, code: string): string {
    const funcString = 'Default.addStripeAccount()';
    const stringifiedID = organizationID.toString();

    const handler = this.__buildHandler({}, false)
      .find(this.__reformatIDValue(stringifiedID))
      .func(funcString);

    return this.__mutateCustom(handler, 'post', stringifiedID, { code });
  }
}

export default new OrganizationDAO();
