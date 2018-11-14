// @flow

class ClientID {
  static _clientId: number = 0;

  static getClientId(): string {
    ClientID._clientId += 1;
    return `CLIENT_ID:${ClientID._clientId.toString()}`;
  }
}

export default ClientID;
