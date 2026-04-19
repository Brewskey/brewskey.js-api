import { deepIdCast } from '../utils/deepIdCast';
import { EntityID, DAOTranslator, QueryOptions } from '../types';

/**
 * Subclasses that override `fromApi` should spread `const cast = super.fromApi(apiValue)`
 * and read navigation / nested entities from **`cast`**, not from raw **`apiValue`**.
 * Otherwise `deepIdCast` (stringifying numeric `id` fields, etc.) is bypassed for those
 * subtrees.
 */
class DefaultTranslator<
  TEntity extends { id: EntityID; isDeleted?: boolean },
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

  /**
   * Expanded navigation / shortened entities: omit when missing or soft-deleted
   * (`undefined`).
   */
  protected getEntityIfNotDeleted<T extends { isDeleted?: boolean }>(
    entity: T | null | undefined,
  ): T | undefined {
    if (entity == null) {
      return undefined;
    }
    return entity.isDeleted ? undefined : entity;
  }
}

export default DefaultTranslator;
