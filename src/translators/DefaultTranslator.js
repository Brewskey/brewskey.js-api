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
