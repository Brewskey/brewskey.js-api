// @flow
import type { Account, AccountMutator } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class AccountDAO extends ODataDAO<Account, AccountMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACCOUNTS,
      translator: new DefaultTranslator(),
    });
  }
}

export default new AccountDAO();
