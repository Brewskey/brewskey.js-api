import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type Account = {
  accessFailedCount: number | null | undefined;
  banned: boolean | null | undefined;
  createdDate: Date;
  email: string | null | undefined;
  emailConfirmed: boolean | null | undefined;
  fullName: string | null | undefined;
  id: EntityID;
  lockoutEnabled: boolean | null | undefined;
  lockoutEndDateUtc: string | null | undefined;
  logins: Record<string, unknown> | null | undefined;
  phoneNumber: string | null | undefined;
  phoneNumberConfirmed: boolean | null | undefined;
  roles: Record<string, unknown> | null | undefined;
  twoFactorEnabled: boolean | null | undefined;
  userName: string;
};

export type AccountMutator = {
  email: string;
  fullName?: string;
  id?: EntityID;
  phoneNumber: string;
  userName: string;
};

class AccountDAOImpl extends ODataDAO<Account, AccountMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ACCOUNTS,
      translator: new DefaultTranslator(),
    });
  }
}

export const AccountDAO = new AccountDAOImpl();
