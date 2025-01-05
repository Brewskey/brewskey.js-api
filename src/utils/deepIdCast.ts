import { EntityID } from '../types';

export const deepIdCast = <TInput extends { id: EntityID }>(
  node: TInput,
): TInput & { id: string } => {
  return Object.entries(node).reduce(
    (acc, [key, value]) => {
      if (value && value === Object(value) && typeof value === 'object') {
        return {
          ...acc,
          [key]: deepIdCast(value),
        };
      }
      if (key === 'id' && value && typeof value === 'number') {
        return {
          ...acc,
          [key]: value.toString(),
        };
      }
      return {
        ...acc,
        [key]: value,
      };
    },
    {} as TInput & { id: string },
  );
};
