declare module 'odata' {
  declare type Header = {
    name: string,
    value: string,
  };
  declare type Options = {
    endpoint?: string,
    json?: boolean,
    version?: number,
    strictMode?: boolean,
    start?: () => any,
    ready?: () => any,
    error?: () => any,
    headers?: Header[],
    username?: string,
    password?: string,
    isAsync?: boolean,
  };

  declare export type OHandler<TEntity> = {
    inlinecount: number,
    data: TEntity | Array<TEntity>,
    oConfig: Options,

    customParam(name: string, value: string): void,

    config(options?: Options): OHandler<TEntity>,
    progress(callback: () => any): OHandler<TEntity>,

    get(callback?: (data: TEntity) => void): Promise<TEntity>,
    save(callback?: (data: TEntity) => void): Promise<TEntity>,
    // save<TEntity>(callback ?: (data : TEntity) => void) : Q.Promise<OHandler<TEntity>>,

    post(params: any): OHandler<TEntity>,
    patch(params: any): OHandler<TEntity>,
    put(params: any): OHandler<TEntity>,
    remove(params?: any): OHandler<TEntity>,

    routes(path: string, callback?: (data: TEntity) => void): OHandler<TEntity>,
    route(path: string, callback?: (data: TEntity) => void): OHandler<TEntity>,
    triggerRoute(hash: string): OHandler<TEntity>,
    beforeRouting(callback: (routeParams: any) => boolean): OHandler<TEntity>,

    isEndpoint(): boolean,
    loading(startFn: () => any | boolean, endFn: () => any): OHandler<TEntity>,

    find(selector: string | number): OHandler<TEntity>,

    func(funcString: string): OHandler<TEntity>,

    top(quantity: number): OHandler<TEntity>,
    take(quantity: number): OHandler<TEntity>,
    skip(quantity: number): OHandler<TEntity>,
    first(): OHandler<TEntity>,

    include(column: string, data: string): OHandler<TEntity>,
    exclude(column: string, data: string): OHandler<TEntity>,
    filterByList(column: string, data: string): OHandler<TEntity>,

    filter(filter: string): OHandler<TEntity>,
    where(filter: string): OHandler<TEntity>,
    any(filter: string, resource: string): OHandler<TEntity>,
    search(columns: string[], term: string): OHandler<TEntity>,

    orderBy(column: string, direction?: boolean): OHandler<TEntity>,
    orderByDesc(column: string): OHandler<TEntity>,
    select(selectStr: string): OHandler<TEntity>,

    count(): OHandler<TEntity>,
    inlineCount(paramName?: string): OHandler<TEntity>,

    batch(resource: string): OHandler<TEntity>,
    expand(resource: string): OHandler<TEntity>,
    getRef(resource: string, id?: string | number): OHandler<TEntity>,
    ref(resource: string, id: string | number): OHandler<TEntity>,
    removeRef(resource: string, id: string | number): OHandler<TEntity>,
    deleteRef<TEntity>(
      resource: string,
      id: string | number,
    ): OHandler<TEntity>,
  }

  declare export default <TEntity>(args?: Options | string) => OHandler<TEntity>;
}
