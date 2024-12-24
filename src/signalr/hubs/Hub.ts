import signalr, { HubConnection } from 'react-native-signalr';
import Config from '../../Config';

const PING_INTERVAL = 60000;

export type Options = {
  logging?: boolean;
  queryParams?: Record<string, never>;
  rootPath?: string;
  shareConnection?: boolean;
  transport?: string | Array<string>;
};

class Hub {
  static CONNECTIONS: Record<string, signalr.HubConnection> = {};

  _connection: HubConnection;

  _connectionPromise: Promise<void> | null | undefined;

  _proxy: signalr.HubProxy;

  _transport: string | Array<string> | null | undefined;

  static initNewConnection(rootPath?: string | null): signalr.HubConnection {
    return rootPath ? signalr.hubConnection(rootPath) : signalr.hubConnection();
  }

  static getConnection(
    rootPath: string | null | undefined,
    shareConnection: boolean,
  ): signalr.HubConnection {
    if (!rootPath) {
      throw new Error('rootPath must be set');
    }
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
      queryParams = {},

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

  serverMethod(name: string): (...args: unknown[]) => Promise<void> {
    return (...args: unknown[]): Promise<void> => {
      if (!this._connectionPromise) {
        return Promise.reject('not initialized');
      }
      return this._connectionPromise.then(
        (): Promise<void> => this._proxy.invoke(name, ...args),
      );
    };
  }

  registerListener(name: string, listener: never) {
    this._proxy.on(name, listener);
  }

  unregisterListener(name: string, listener: never) {
    this._proxy.off(name, listener);
  }

  registerErrorHandler(handler: (error: Error) => void) {
    this._connection.error(handler);
  }
}

export default Hub;
