// @flow
export type EntityName =
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

export type DAOTranslator<TModel, TModelMutator> = {
  +fromApi: (apiValue: Object) => TModel,
  +toApi: (model: TModelMutator) => Object,
  +toForm: (model: TModel) => TModelMutator,
};

export type DAOConfig<TModel, TModelMutator> = {
  entityName: EntityName,
  navigationProperties?: {[string]: ?Array<string>},
  translator: DAOTranslator<TModel, TModelMutator>,
};
