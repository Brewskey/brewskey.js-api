// @flow

import type { QueryFilter } from './filters';
import type ODataDAO from './dao/ODataDAO';
import type RestDAO from './dao/RestDAO';

export type DAO<TEntity, TEntityMutator> =
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
  | 'devices'
  | 'flow-sensors'
  | 'friends'
  | 'kegs'
  | 'locations'
  | 'organizations'
  | 'permissions'
  | 'pours'
  | 'reports'
  | 'schedule-groups'
  | 'schedules'
  | 'taps';

export type ShortenedEntity = {
  id: EntityID,
  isDeleted: boolean,
  name: string,
};

export type EntityID = string | number;

export type Header = {
  name: string,
  value: string,
};

export type Headers = Array<Header>;

export type ODataDAOResult = {
  data: any,
  inlinecount?: number,
};

export type QueryOrderBy = {
  column: string,
  direction: 'asc' | 'desc',
};

export type QueryOptions = {
  apply?: string,
  filters?: Array<QueryFilter>,
  orderBy?: Array<QueryOrderBy>,
  shouldCount?: boolean,
  skip?: number,
  take?: number,
};

export type ODataNavigationProperties = {
  [key: string]: {
    expand?: ODataNavigationProperties,
    select?: Array<string>,
  },
};

export type RequestMethod = 'delete' | 'get' | 'patch' | 'post' | 'put';

export type ODataConfig = {
  endpoint: string,
  headers?: Headers,
};

export type ODataDAOConfig<TEntity, TEntityMutator> = {|
  entityName: EntityName,
  navigationProperties?: ODataNavigationProperties,
  translator: DAOTranslator<TEntity, TEntityMutator>,
|};

export type DAOTranslator<TEntity, TEntityMutator> = {
  +fromApi: (apiValue: Object) => TEntity,
  +toApi: (model: TEntityMutator) => Object,
  +toForm: (model: TEntity) => TEntityMutator,
};
