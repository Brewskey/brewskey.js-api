// @flow
import _ from 'lodash';

const deepIdCast = (node: any): any => {
  if (_.isArray(node)) {
    return _.map(node, (item: any): any => deepIdCast(item));
  } else if (_.isPlainObject(node)) {
    return _.mapValues(
      node,
      (value: any, key: string): any =>
        key === 'id'
          ? value.toString()
          : deepIdCast(value)
    );
  }

  return node;
};

class DefaultTranslator<TModel, TModelMutator> {
  fromApi(apiValue: Object): TModel {
    return deepIdCast(apiValue);
  }

  toApi(mutator: TModelMutator): Object {
    return ((mutator: any): Object);
  }

  toForm(model: TModel): TModelMutator {
    return ((model: any): TModelMutator);
  }
}

export default DefaultTranslator;
