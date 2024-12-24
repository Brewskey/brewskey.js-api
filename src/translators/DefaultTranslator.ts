import { deepIdCast } from '../utils/deepIdCast';
import { EntityID, DAOTranslator, QueryOptions } from '../types';

class DefaultTranslator<
  TEntity extends { id: EntityID },
  TEntityMutator,
  TFromApi = TEntity,
  TMutatorResult = TEntity,
> implements DAOTranslator<TEntity, TEntityMutator, TFromApi, TMutatorResult>
{
  fromApi(apiValue: TFromApi): TEntity {
    return deepIdCast(
      apiValue as unknown as { id: EntityID },
    ) as unknown as TEntity;
  }

  toApi(mutator: TEntityMutator): TMutatorResult & QueryOptions {
    return mutator as unknown as TMutatorResult & QueryOptions;
  }

  toForm(model: TEntity): TEntityMutator {
    return model as unknown as TEntityMutator;
  }
}

export default DefaultTranslator;
