// @flow
import type { Account, AccountMutator } from '../index';
import DefaultTranslator from './DefaultTranslator';

const formatPhoneNumber = (number: ?number): ?string => {
  if (!number) {
    return null;
  }
  const numberString = number.toString();

  return `(${numberString.slice(0, 3)})-` +
    `${numberString.slice(3, 6)}-${numberString.slice(6, 10)}`;
};


class AccountTranslator extends DefaultTranslator<Account, AccountMutator> {
  fromApi(apiValue: Object): Account {
    return {
      ...super.fromApi(apiValue),
      phoneNumber: formatPhoneNumber(apiValue.phoneNumber),
    };
  }

  toApi(mutator: AccountMutator): Object {
    return {
      ...mutator,
      phoneNumber: mutator.phoneNumber &&
        parseInt(mutator.phoneNumber.replace(/[^\d]/g, ''), 10),
    };
  }
}

export default AccountTranslator;
