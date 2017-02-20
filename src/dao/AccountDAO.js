// @flow
import type { Account } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class AccountDAO extends DAO<Account, Account> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACCOUNTS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AccountDAO();
