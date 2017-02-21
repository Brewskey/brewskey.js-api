// @flow

const deepIdCast = (node: any): any => {
  Object.keys(node).forEach((key) => {
    if (node[key] === Object(node[key])) {
      deepIdCast(node[key]);
    }
    if (key === 'id') {
      node[key] = node[key].toString();
    }
  });
  return node;
};

class DefaultTranslator<TEntity, TEntityMutator> {
  fromApi(apiValue: Object): TEntity {
    return deepIdCast(apiValue);
  }

  toApi(mutator: TEntityMutator): Object {
    return ((mutator: any): Object);
  }

  toForm(model: TEntity): TEntityMutator {
    return ((model: any): TEntityMutator);
  }
}

export default DefaultTranslator;
