import type { EntityID, ODataDAOResult, QueryOptions } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Organization = {
  canEnablePayments: boolean;
  createdDate: Date;
  id: EntityID;
  isDeleted: boolean;
  name: string;
};

export type OrganizationMutator = {
  id?: EntityID;
  name: string;
};

export type SquareLocation = {
  locationID: string;
  name: string;
};

class OrganizationDAOImpl extends ODataDAO<Organization, OrganizationMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ORGANIZATIONS,
      translator: new DefaultTranslator(),
    });
  }

  fetchWithPayments(queryOptions: QueryOptions): Promise<Organization[]> {
    const funcString = 'Default.withPayments()';

    const handler = this.__buildHandler(queryOptions, false);
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions);
  }

  fetchSquareLocations(
    organizationID: EntityID,
    queryOptions?: QueryOptions,
  ): Promise<SquareLocation[]> {
    const funcString = 'Default.fetchSquareLocations()';
    const stringifiedID = organizationID.toString();

    const handler = this.__buildHandler(queryOptions, false).find(
      this.__reformatValue(stringifiedID),
    );
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions);
  }

  deauthorizeOAuthIntegration(
    organizationID: string,
    partner: string = 'Square',
  ): Promise<ODataDAOResult<unknown>> {
    const funcString = 'Default.deauthorizeOAuthIntegration()';
    const stringifiedID = organizationID.toString();

    const handler = this.__buildHandler({}, false)
      .find(this.__reformatValue(stringifiedID))
      .func(funcString);

    return this.__mutateCustom(handler, 'POST', {
      partner,
      filters: [],
    });
  }
}

export const OrganizationDAO = new OrganizationDAOImpl();
