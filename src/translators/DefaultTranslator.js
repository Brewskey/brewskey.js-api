// @flow
const deepIdCast = (node: any): any => {
  if (Array.isArray(node)) {
    return node.map(deepIdCast);
  } else if (node && typeof node === 'object' && node.constructor === Object) {
    const newNode = {};
    Object.keys(node).forEach((key: string) => {
      newNode[key] = key === 'id'
        ? node[key].toString()
        : node[key];
    });
    return newNode;
  }

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
