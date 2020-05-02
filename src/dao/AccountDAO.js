// @flow

import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Account = {|
  accessFailedCount: ?number,
  banned: ?boolean,
  createdDate: Date,
  email: ?string,
  emailConfirmed: ?boolean,
  fullName: ?string,
  id: EntityID,
  lockoutEnabled: ?boolean,
  lockoutEndDateUtc: ?string,
  logins: ?Object,
  phoneNumber: ?string,
  phoneNumberConfirmed: ?boolean,
  roles: ?Object,
  twoFactorEnabled: ?boolean,
  userName: string,
|};

export type AccountMutator = {|
  email: string,
  fullName?: string,
  id?: EntityID,
  phoneNumber: string,
  userName: string,
|};

class AccountDAO extends ODataDAO<Account, AccountMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACCOUNTS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AccountDAO();
