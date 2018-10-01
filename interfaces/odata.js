
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

  declare type OHandler<TEntity> = {
    inlinecount: number,
    data: TEntity | Array<TEntity>,
    oConfig: Options,

    customParam(name: string, value: string): void,

    config<TEntity>(options?: Options): OHandler<TEntity>,
    progress<TEntity>(callback: () => any): OHandler<TEntity>,

    get<TEntity>(callback?: (data : TEntity) => void): Promise<TEntity>,
    save<TEntity>(callback?: (data : TEntity) => void): Promise<TEntity>,
    // save<TEntity>(callback ?: (data : TEntity) => void) : Q.Promise<OHandler<TEntity>>,

    post<TEntity>(params: any): OHandler<TEntity>,
    patch<TEntity>(params: any): OHandler<TEntity>,
    put<TEntity>(params: any): OHandler<TEntity>,
    remove<TEntity>(params?: any): OHandler<TEntity>,

    routes<TEntity>(path: string, callback?: (data: TEntity) => void): OHandler<TEntity>,
    route<TEntity>(path: string, callback?: (data: TEntity) => void): OHandler<TEntity>,
    triggerRoute<TEntity>(hash: string): OHandler<TEntity>,
    beforeRouting<TEntity>(callback: (routeParams: any) => boolean): OHandler<TEntity>,

    isEndpoint(): boolean,
    loading<TEntity>(startFn: () => any | boolean, endFn: () => any): OHandler<TEntity>,

    find<TEntity>(selector: string|number): OHandler<TEntity>,

    top<TEntity>(quantity: number): OHandler<TEntity>,
    take<TEntity>(quantity: number): OHandler<TEntity>,
    skip<TEntity>(quantity: number): OHandler<TEntity>,
    first<TEntity>(): OHandler<TEntity>,

    include<TEntity>(column: string, data: string): OHandler<TEntity>,
    exclude<TEntity>(column: string, data: string): OHandler<TEntity>,
    filterByList<TEntity>(column: string, data: string): OHandler<TEntity>,

    filter<TEntity>(filter: string): OHandler<TEntity>,
    where<TEntity>(filter: string): OHandler<TEntity>,
    any<TEntity>(filter: string, resource: string): OHandler<TEntity>,
    search<TEntity>(columns: string[], term: string): OHandler<TEntity>,

    orderBy<TEntity>(column: string, direction?: boolean): OHandler<TEntity>,
    orderByDesc<TEntity>(column: string): OHandler<TEntity>,
    select<TEntity>(selectStr: string): OHandler<TEntity>,

    count<TEntity>(): OHandler<TEntity>,
    inlineCount<TEntity>(paramName?: string): OHandler<TEntity>,

    batch<TEntity>(resource: string): OHandler<TEntity>,
    expand<TEntity>(resource: string): OHandler<TEntity>,
    getRef<TEntity>(resource: string, id?: string | number): OHandler<TEntity>,
    ref<TEntity>(resource: string, id: string | number): OHandler<TEntity>,
    removeRef<TEntity>(resource: string, id: string | number): OHandler<TEntity>,
    deleteRef<TEntity>(resource: string, id: string | number): OHandler<TEntity>,
  };


  declare function exports<TEntity>(args?: Options | string): OHandler<TEntity>

  declare export default typeof exports;
}
