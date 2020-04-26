// @flow

import signalr from 'react-native-signalr';
import Config from '../../Config';

const PING_INTERVAL = 60000;

export type Options = {
  logging?: boolean,
  queryParams?: Object,
  rootPath?: string,
  shareConnection?: boolean,
  transport?: string | Array<string>,
};

class Hub {
  static CONNECTIONS: Object = {};

  _connection: Object;

  _connectionPromise: ?Promise<void>;

  _proxy: Object;

  _transport: ?(string | Array<string>);

  static initNewConnection(rootPath: ?string): Object {
    return rootPath ? signalr.hubConnection(rootPath) : signalr.hubConnection();
  }

  static getConnection(rootPath: ?string, shareConnection: boolean): Object {
    if (!shareConnection) {
      return Hub.initNewConnection(rootPath);
    }

    let connection = Hub.CONNECTIONS[rootPath];

    if (!connection) {
      connection = Hub.initNewConnection(rootPath);
      Hub.CONNECTIONS[rootPath] = connection;
    }

    return connection;
  }

  constructor(
    name: string,
    {
      logging = false,
      queryParams,
      // todo fix with Config.host
      rootPath = 'https://brewskey.com',
      shareConnection = true,
      transport,
    }: Options = {},
  ) {
    this._connection = Hub.getConnection(rootPath, shareConnection);
    this._proxy = this._connection.createHubProxy(name);
    this._connection.logging = logging;
    this._connection.qs = queryParams;
    this._transport = transport;
  }

  connect(): Promise<void> {
    const { _connection, _transport } = this;
    _connection.qs = {
      ...(_connection.qs || {}),
      ...(Config.token != null
        ? {
            access_token: Config.token,
          }
        : {}),
    };

    this._connectionPromise = _transport
      ? _connection.start({
          pingInterval: PING_INTERVAL,
          transport: _transport,
        })
      : _connection.start({ pingInterval: PING_INTERVAL });

    return this._connectionPromise;
  }

  disconnect() {
    this._connection.stop();
  }

  serverMethod(name: string): Function {
    return (...args: Array<any>): ?Promise<any> =>
      this._connectionPromise &&
      this._connectionPromise.then((): Promise<any> =>
        this._proxy.invoke(name, ...args),
      );
  }

  registerListener(name: string, listener: Function) {
    this._proxy.on(name, listener);
  }

  unregisterListener(name: string, listener: Function) {
    this._proxy.off(name, listener);
  }

  registerErrorHandler(handler: Function) {
    this._connection.error(handler);
  }
}

export default Hub;
