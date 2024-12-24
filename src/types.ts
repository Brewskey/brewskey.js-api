import type { QueryFilter } from './filters';
import type ODataDAO from './dao/ODataDAO';
import type RestDAO from './dao/RestDAO';

export type DAO<TEntity extends { id: EntityID }, TEntityMutator> =
  | ODataDAO<TEntity, TEntityMutator>
  | RestDAO<TEntity, TEntityMutator>;

export type EntityName =
  | 'accounts'
  | 'achievements'
  | 'beverage-availabilities'
  | 'beverage-glasses'
  | 'beverage-srms'
  | 'beverage-styles'
  | 'beverages'
  | 'chart'
  | 'cloud-device-pings'
  | 'cloud-devices'
  | 'devices'
  | 'flow-sensors'
  | 'friends'
  | 'kegs'
  | 'locations'
  | 'organizations'
  | 'payments'
  | 'permissions'
  | 'pours'
  | 'price-variants'
  | 'product-devices'
  | 'product-firmwares'
  | 'products'
  | 'reports'
  | 'schedule-groups'
  | 'schedules'
  | 'taps';

export type ShortenedEntity = {
  id: EntityID;
  isDeleted: boolean;
  name: string;
};

export type EntityID = string | number;

export type Header = {
  name: string;
  value: string;
};

export type Headers = Array<Header>;

export type ODataDAOResult<TResult> = {
  data: TResult;
  inlinecount?: number;
};

export type QueryOrderBy = {
  column: string;
  direction: 'asc' | 'desc';
};

export type QueryOptions = {
  apply?: string;
  filter?: string;
  filters?: Array<QueryFilter>;
  orderBy?: Array<QueryOrderBy>;
  search?: string;
  shouldCount?: boolean;
  shouldIgnoreOrganizationID?: true;
  shouldRefresh?: boolean;
  skip?: number;
  take?: number;
};

export type ODataNavigationProperty = {
  expand?: ODataNavigationProperties;
  select?: Array<string>;
};

export type ODataNavigationProperties = {
  [key: string]: ODataNavigationProperty;
};

export type RequestMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export type ODataDAOConfig<
  TEntity,
  TEntityMutator,
  TFromApi = TEntity,
  TMutatorResult = TEntity,
> = {
  entityName: EntityName;
  navigationProperties?: ODataNavigationProperties;
  translator: DAOTranslator<TEntity, TEntityMutator, TFromApi, TMutatorResult>;
};

export interface DAOTranslator<
  TEntity,
  TEntityMutator,
  TFromApi = TEntity,
  TMutatorResult = TEntity,
> {
  fromApi(apiValue: TFromApi): TEntity;

  toApi(mutator: TEntityMutator): TMutatorResult & QueryOptions;

  toForm(model: TEntity): TEntityMutator;
}
