// @flow
import type { OHandler } from 'odata';

declare module 'brewskey.js-api' {
  /* DAO
  */

  declare type EntityName =
    'accounts' |
    'beverage-availabilities' |
    'beverage-glasses' |
    'beverage-srms' |
    'beverage-styles' |
    'beverages' |
    'devices' |
    'kegs' |
    'locations' |
    'permissions' |
    'pours' |
    'schedule-groups' |
    'schedules' |
    'taps';

  declare type DAOTranslator<TEntity, TEntityMutator> = {
    +fromApi: (apiValue: Object) => TEntity,
    +toApi: (model: TEntityMutator) => Object,
    +toForm: (model: TEntity) => TEntityMutator,
  };

  declare type DAOConfig<TEntity, TEntityMutator> = {
    entityName: EntityName,
    navigationProperties?: {[string]: ?Array<string>},
    translator: DAOTranslator<TEntity, TEntityMutator>,
  };

  /* odata
  */

  declare type RequestMethod =
    'delete' |
    'get' |
    'patch' |
    'post' |
    'put';

  declare type FilterOperator =
    'contains' |
    'endswith' |
    'eq' |
    'gt' |
    'ge' |
    'lt' |
    'le' |
    'not endswith' |
    'ne' |
    'not startswith' |
    'startswith';

  declare type QueryFilter = {
    operator: FilterOperator,
    params: Array<string>,
    values: Array<string>
  };

  declare type QueryOrderBy = {
    column: string,
    direction: 'asc' | 'desc',
  };

  declare type QueryOptions = {
    count?: boolean,
    filters?: Array<QueryFilter>,
    orderBy?: Array<QueryOrderBy>,
    skip?: number,
    take?: number,
  };

  declare type ODataChartParams = {
    beginDate?: ?Date,
    endDate?: ?Date,
  };

  /* Entities
  */

  declare type Account = {
    accessFailedCount: number,
    banned: boolean,
    createdDate: string,
    email: string,
    emailConfirmed: boolean,
    fullName: ?string,
    id: string,
    lockoutEnabled: boolean,
    lockoutEndDateUtc: ?string,
    logins: Object,
    phoneNumber: ?number,
    phoneNumberConfirmed: boolean,
    roles: Object,
    twoFactorEnabled: boolean,
    userName: string,
  };

  declare type Availability = {
    description: ?string,
    id: string,
    name: string,
  };

  declare type BeverageType =
    'Beer' |
    'Cider' |
    'Coffee' |
    'Soda';

  declare type ServingTemperature =
    'cellar' |
    'cold' |
    'cool' |
    'hot' |
    'very_cold' |
    'warm';

  declare type Beverage = {
    abv: number,
    availableId: ?string,
    beerVariationId: ?string,
    beverageType: BeverageType,
    createDate: Date,
    createdBy: {
      id: string,
      userName: string,
    },
    description: ?string,
    externalId: ?string,
    foodPairings: ?string,
    glasswareId: ?number,
    ibu: number,
    id: string,
    isOrganic: ?string,
    labels: {
      icon: string,
      large: string,
      medium: string,
    },
    name: string,
    originalGravity: ?number,
    servingTemperature: ?ServingTemperature,
    servingTemperatureDisplay: ?string,
    srmId: ?string,
    styleId: ?string,
    updateDate: Date,
    year: ?number,
  };

  declare type Device = {
    createdBy: {
      id: string,
      userName: string,
    },
    deviceStatus: string,
    id: number,
    isDeleted: boolean,
    isMultiTap: boolean,
    lastEdited: string,
    lastEditedBy: {
      id: string,
      userName: string,
    },
    name: string,
    particleId: string,
    temperature: number,
  };

  declare type Glass = {
    createDate: Date,
    description: ?string,
    id: string,
    name: string,
    updateDate: Date,
  };

  declare type Keg = {
    beerIcon: string,
    beerId: string,
    beerName: string,
    floatedDate: string,
    id: number,
    kegType: string,
    location: {
      id: number,
      name: string,
    },
    maxOunces: number,
    ounces: number,
    pulses: number,
    tap: {
      id: number,
      name: string,
    },
    tapDate: string,
  };

  declare type Location = {
    city: string,
    createdDate: string,
    description: string,
    geolocation: Object,
    id: number,
    locationType: string,
    name: string,
    state: ?string,
    street: string,
    suite: string,
    summary: string,
    timeZone: string,
    zipCode: number,
  };

  declare type PermissionEntityType =
    'devices' |
    'locations' |
    'taps';

  declare type PermissionType =
    'Administrator'|
    'Edit'|
    'Read'|
    'BannedFromTap';

  declare type Permission = {
    createdBy: {
      id: string,
      userName: string,
    },
    createdDate: Date,
    device: ?{
      id: string,
      name: string,
    },
    expiresDate: ?Date,
    forUser: {
      id: string,
      userName: string,
    },
    id: string,
    invalid: boolean,
    location: ?{
      id: string,
      name: string,
    },
    permissionType: PermissionType,
    startDate: ?Date,
    tap: ?{
      id: string,
      name: string,
    },
  };

  declare type PermissionMutator = {
    entityId: string,
    entityType: PermissionEntityType,
    expiresDate: ?Date,
    id: ?string,
    permissionType: PermissionType,
    startDate: ?Date,
    userId: string,
  };

  declare type Pour = {
    beverage: {
      id: number,
      name: string,
    },
    id: number,
    location: {
      id: number,
      name: string,
    },
    ounces: number,
    owner: {
      id: string,
      userName: string,
    },
    pourDate: string,
    pulses: number,
    tap: {
      id: number,
      name: string,
    },
  };

  declare type Schedule = {
    accounts: Array<{
      id: string,
      name: string,
    }>,
    createdDate: Date,
    days: number,
    editDate: Date,
    endTime: Date,
    id: string,
    location: {
      id: string,
      name: string,
    },
    name: string,
    startTime: Date,
  };

  declare type ScheduleMutator = {
    accounts: Array<{
      id: string,
      name: string,
    }>,
    days: number,
    endTime: Date,
    id: ?string,
    locationId: ?string,
    name: string,
    startTime: Date,
  };

  declare type Srm = {
    hex: string,
    id: string,
    name: string,
  };

  declare type Style = {
    abvMax: number,
    abvMin: number,
    createDate: Date,
    description: ?string,
    fgMax: number,
    fgMin: number,
    ibuMax: number,
    ibuMin: number,
    id: string,
    name: string,
    ogMax: number,
    ogMin: number,
    srmMax: number,
    srmMin: number,
    updateDate: Date,
  };

  declare type Tap = {
    createdDate: string,
    description: ?string,
    device: {
      id: string,
      name: string,
    },
    disableBadges: boolean,
    hideLeaderboard: boolean,
    hideStats: boolean,
    id: string,
    location: {
      id: string,
      name: string,
    },
    name: string,
    requiresPourPrivilege: boolean,
  };

  declare type TapMutator = {
    createdDate: ?string,
    description: ?string,
    deviceId: string,
    disableBadges: boolean,
    hideLeaderboard: boolean,
    hideStats: boolean,
    id: ?string,
    locationId: string,
    name: string,
    requiresPourPrivilege: boolean,
  };

  /* DAO implementation
  */

  declare type ODataResult<TEntity> = OHandler<TEntity> & {
    data: TEntity | Array<TEntity>,
    inlinecount: ?number,
  };

  declare class DAO<TEntity, TEntityMutator> {
    _config: DAOConfig<TEntity, TEntityMutator>;
    count(queryOptions: QueryOptions): Promise<DAOResult<TEntity>>;
    deleteByID(id: string): Promise<DAOResult<TEntity>>;
    fetchByID(id: string): Promise<DAOResult<TEntity>>;
    fetchByIDs(ids: Array<string>, meta?: Object): Promise<DAOResult<TEntity>>;
    fetchMany(queryOptions?: QueryOptions): Promise<DAOResult<TEntity>>;
    getEntityName(): EntityName;
    getTranslator(): DAOTranslator<TEntity, TEntityMutator>;
    patch(id: string, params: TEntityMutator): Promise<DAOResult<TEntity>>;
    post(params: TEntityMutator): Promise<DAOResult<TEntity>>;
    put(id: string, params: TEntityMutator): Promise<DAOResult<TEntity>>;
  }

  declare class DAOResult<TEntity> {
    _count: ?number;
    _data: ?TEntity | ?Array<TEntity>;
    _error: ?Error;
    count(): ?number;
    getData(): ?TEntity | ?Array<TEntity>;
    getError(): ?Error;
  }

  declare class brewskey$AccountDAO extends DAO<Account, Account> {}
  declare class brewskey$AvailabilityDAO
    extends DAO<Availability, Availability> {}
  declare class brewskey$BeverageDAO extends DAO<Beverage, Beverage> {}
  declare class brewskey$DeviceDAO extends DAO<Device, Device> {}
  declare class brewskey$GlassDAO extends DAO<Glass, Glass> {}
  declare class brewskey$KegDAO extends DAO<Keg, Keg> {
    fetchKegByTapID(tapId: string): Promise<DAOResult<Keg>>;
  }
  declare class brewskey$LocationDAO extends DAO<Location, Location> {}
  declare class brewskey$PermissionDAO
    extends DAO<Permission, PermissionMutator> {}
  declare class brewskey$PourDAO extends DAO<Pour, Pour> {
    fetchChartData(params: ODataChartParams): Promise<DAOResult<Pour>>;
  }
  declare class brewskey$ScheduleDAO extends DAO<Schedule, ScheduleMutator> {}
  declare class brewskey$SrmDAO extends DAO<Srm, Srm> {}
  declare class brewskey$StyleDAO extends DAO<Style, Style> {}
  declare class brewskey$TapDAO extends DAO<Tap, TapMutator> {}

  declare var DAO: DAO;
  declare var AccountDAO: brewskey$AccountDAO;
  declare var AvailabilityDAO: brewskey$AvailabilityDAO;
  declare var BeverageDAO: brewskey$BeverageDAO;
  declare var DeviceDAO: brewskey$DeviceDAO;
  declare var GlassDAO: brewskey$GlassDAO;
  declare var KegDAO: brewskey$KegDAO;
  declare var LocationDAO: brewskey$LocationDAO;
  declare var PermissionDAO: brewskey$PermissionDAO;
  declare var PourDAO: brewskey$PourDAO;
  declare var ScheduleDAO: brewskey$ScheduleDAO;
  declare var SrmDAO: brewskey$SrmDAO;
  declare var StyleDAO: brewskey$StyleDAO;
  declare var TapDAO: brewskey$TapDAO;

  /* Utilities
  */
  declare var DAO_ENTITIES: { [string]: EntityName };
  declare var FILTER_OPERATORS: { [key: string]: FilterOperator };
  declare type Headers = Array<{
    name: string,
    value: string,
  }>;

  declare type FilterCreators = (params: { [string]: any }) => QueryFilter;
  declare function apiFilter(params: any): FilterCreators;
  declare function apiFetch(path: string, init: ?Object): Promise<*>;

  declare function getHeaders(): Headers;
  declare function setHeaders(headers: Headers): void;
}
