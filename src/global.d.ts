declare module 'odata' {
  declare type Header = {
    name: string;
    value: string;
  };
  export type Options = {
    endpoint?: string;
    json?: boolean;
    version?: number;
    strictMode?: boolean;
    start?: () => void;
    ready?: () => void;
    error?: () => void;
    headers?: Header[];
    username?: string;
    password?: string;
    isAsync?: boolean;
  };

  export type OHandler<TEntity> = {
    inlinecount: number;
    data: TEntity | Array<TEntity>;
    oConfig: Options;

    customParam(name: string, value: string): void;

    config(options?: Options): OHandler<TEntity>;
    progress(callback: () => void): OHandler<TEntity>;

    get(callback?: (data: TEntity) => void): Promise<ODataDAOResult<TEntity>>;
    save(callback?: (data: TEntity) => void): Promise<ODataDAOResult<TEntity>>;
    // save<TEntity>(callback ?: (data : TEntity) => void) : Q.Promise<OHandler<TEntity>>,

    post(params: QueryOptions | null): OHandler<TEntity>;
    patch(params: QueryOptions | null): OHandler<TEntity>;
    put(params: QueryOptions | null): OHandler<TEntity>;
    remove(params?: QueryOptions | null): OHandler<TEntity>;

    routes(path: string, callback?: (data: TEntity) => void): OHandler<TEntity>;
    route(path: string, callback?: (data: TEntity) => void): OHandler<TEntity>;
    triggerRoute(hash: string): OHandler<TEntity>;
    beforeRouting(
      callback: (routeParams: Record<string, never>) => boolean,
    ): OHandler<TEntity>;

    isEndpoint(): boolean;
    loading(
      startFn: () => void | boolean,
      endFn: () => void,
    ): OHandler<TEntity>;

    find(selector: string | number): OHandler<TEntity>;

    func(funcString: string): OHandler<TEntity>;

    top(quantity: number): OHandler<TEntity>;
    take(quantity: number): OHandler<TEntity>;
    skip(quantity: number): OHandler<TEntity>;
    first(): OHandler<TEntity>;

    include(column: string, data: string): OHandler<TEntity>;
    exclude(column: string, data: string): OHandler<TEntity>;
    filterByList(column: string, data: string): OHandler<TEntity>;

    filter(filter: string): OHandler<TEntity>;
    where(filter: string): OHandler<TEntity>;
    any(filter: string, resource: string): OHandler<TEntity>;
    search(columns: string[], term: string): OHandler<TEntity>;

    orderBy(column: string, direction?: boolean): OHandler<TEntity>;
    orderByDesc(column: string): OHandler<TEntity>;
    select(selectStr: string): OHandler<TEntity>;

    count(): OHandler<TEntity>;
    inlineCount(paramName?: string): OHandler<TEntity>;

    batch(resource: string): OHandler<TEntity>;
    expand(resource: string): OHandler<TEntity>;
    getRef(resource: string, id?: string | number): OHandler<TEntity>;
    ref(resource: string, id: string | number): OHandler<TEntity>;
    removeRef(resource: string, id: string | number): OHandler<TEntity>;
    deleteRef(resource: string, id: string | number): OHandler<TEntity>;
  };

  export default <TEntity>(_args?: Options | string) => OHandler<TEntity>;
}

declare module 'react-native-signalr' {
  export class HubProxy {
    invoke(command: string, ...params: unknown[]): Promise<void>;
    on(key: string, callback: never): void;
    off(key: string, callback: never): void;
  }
  export class HubConnection {
    createHubProxy(name: string): HubProxy;
    start(args: {
      pingInterval: number;
      transport?: string | string[];
    }): Promise<void>;
    stop(): Promise<void>;
    error(cb: (error: Error) => void): void;

    logging: boolean;

    qs: Record<string, unknown>;
  }
  export function hubConnection(rootPath?: string): HubConnection;
}
