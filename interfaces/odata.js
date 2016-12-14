
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

  declare type OHandler<TModel> = {
     inlineCount: number,
     data: TModel,
     oConfig: Options,

     config<TModel>(options?: Options): OHandler<TModel>,
     progress<TModel>(callback: () => any): OHandler<TModel>,

     get<TModel>(callback?: (data : TModel) => void): Promise<TModel>,
     save<TModel>(callback?: (data : TModel) => void): Promise<TModel>,
     // save<TModel>(callback ?: (data : TModel) => void) : Q.Promise<OHandler<TModel>>,

     post<TModel>(params: any): OHandler<TModel>,
     patch<TModel>(params: any): OHandler<TModel>,
     put<TModel>(params: any): OHandler<TModel>,
     remove<TModel>(params?: any): OHandler<TModel>,

     routes<TModel>(path: string, callback?: (data: TModel) => void): OHandler<TModel>,
     route<TModel>(path: string, callback?: (data: TModel) => void): OHandler<TModel>,
     triggerRoute<TModel>(hash: string): OHandler<TModel>,
     beforeRouting<TModel>(callback: (routeParams: any) => boolean): OHandler<TModel>,

     isEndpoint(): boolean,
     loading<TModel>(startFn: () => any | boolean, endFn: () => any): OHandler<TModel>,

     find<TModel>(selector: string|number): OHandler<TModel>,

     top<TModel>(quantity: number): OHandler<TModel>,
     take<TModel>(quantity: number): OHandler<TModel>,
     skip<TModel>(quantity: number): OHandler<TModel>,
     first<TModel>(): OHandler<TModel>,

     include<TModel>(column: string, data: string): OHandler<TModel>,
     exclude<TModel>(column: string, data: string): OHandler<TModel>,
     filterByList<TModel>(column: string, data: string): OHandler<TModel>,

     filter<TModel>(filter: string): OHandler<TModel>,
     where<TModel>(filter: string): OHandler<TModel>,
     any<TModel>(filter: string, resource: string): OHandler<TModel>,
     search<TModel>(columns: string[], term: string): OHandler<TModel>,

     orderBy<TModel>(column: string, direction?: boolean): OHandler<TModel>,
     orderByDesc<TModel>(column: string): OHandler<TModel>,
     select<TModel>(selectStr: string): OHandler<TModel>,

     count<TModel>(): OHandler<TModel>,
     inlineCount<TModel>(paramName?: string): OHandler<TModel>,

     batch<TModel>(resource: string): OHandler<TModel>,
     expand<TModel>(resource: string): OHandler<TModel>,
     getRef<TModel>(resource: string, id?: string | number): OHandler<TModel>,
     ref<TModel>(resource: string, id: string | number): OHandler<TModel>,
     removeRef<TModel>(resource: string, id: string | number): OHandler<TModel>,
     deleteRef<TModel>(resource: string, id: string | number): OHandler<TModel>,
   };


  declare function exports<TModel>(args?: Options | string): OHandler<TModel>
}
