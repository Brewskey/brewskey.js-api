// @flow
import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Organization = {
  canEnablePayments: boolean,
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

  deauthorizeStripeAccount(organizationID: string): string {
    const funcString = 'Default.deauthorizeStripeAccount()';
    const stringifiedID = organizationID.toString();

    const handler = this.__buildHandler({}, false)
      .find(this.__reformatIDValue(stringifiedID))
      .func(funcString);

    return this.__mutateCustom(handler, 'post', stringifiedID);
  }
}

export default new OrganizationDAO();
