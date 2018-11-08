// @flow

class ClientID {
  static ClientID;

  static getClientID(): string {
    ClientID._clientID += 1;
    return `CLIENT_ID:${ClientID._clientID}`;
  }
}

export default ClientID;
