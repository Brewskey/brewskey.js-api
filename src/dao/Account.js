// @flow
import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/Default';

export type Account = {
  accessFailedCount: number,
  banned: boolean,
  createdDate: string,
  email: string,
  emailConfirmed: boolean,
  fullName: ?string,
  id: string,
  lockoutEnabled: boolean,
  lockoutEndDateUtc: ?string,
  logins: Object,
  phoneNumber: ?number,
  phoneNumberConfirmed: boolean,
  roles: Object,
  twoFactorEnabled: boolean,
  userName: string,
};

class AccountDAO extends DAO<Account, Account> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACCOUNTS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AccountDAO();
