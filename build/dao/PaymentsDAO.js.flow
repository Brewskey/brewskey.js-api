// @flow

import RestDAO from './RestDAO';

export type CreditCardDetails = {|
  brand: string,
  expirationMonth: number,
  expirationYear: number,
  last4: string,
|};

export type CreditCardDetailsMutator = {|
  token: string,
|};

class PaymentsDAO extends RestDAO<CreditCardDetails, CreditCardDetailsMutator> {
  constructor() {
    super({ entityName: 'payments' });
  }

  get() {
    return this.__getOne(`api/v2/payments/`, 'mine', {
      reformatError: error => error.error,
    });
  }

  // Only FinancialAdministrator can call this
  getOneForAccount(userName: string) {
    return this.__getOne(`api/v2/payments/${userName}/`, userName, {
      reformatError: error => error.error,
    });
  }

  addPaymentMethod(token: string) {
    return this.__put(`api/v2/payments/`, 'mine', { token });
  }

  removePaymentMethod(id: string = 'mine') {
    return this.__delete('api/v2/payments/', id);
  }
}

export default new PaymentsDAO();
