// @flow
import type { Account, AccountMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import AccountTranslator from '../translators/AccountTranslator';

class AccountDAO extends DAO<Account, AccountMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACCOUNTS,
      translator: new AccountTranslator(),
    });
  }
}

export default new AccountDAO();
