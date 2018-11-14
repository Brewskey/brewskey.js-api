// @flow

class ClientID {
  static _clientId: string;

  static getClientId(): string {
    ClientID._clientId += 1;
    return `CLIENT_ID:${ClientID._clientId}`;
  }
}

export default ClientID;
