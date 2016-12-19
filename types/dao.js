// @flow
declare module 'brewskey.js-api' {
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

  declare type DAOTranslator<TModel, TModelMutator> = {
    +fromApi: (apiValue: Object) => TModel,
    +toApi: (model: TModelMutator) => Object,
    +toForm: (model: TModel) => TModelMutator,
  };

  declare type DAOConfig<TModel, TModelMutator> = {
    entityName: EntityName,
    navigationProperties?: {[string]: ?Array<string>},
    translator: DAOTranslator<TModel, TModelMutator>,
  };
}
