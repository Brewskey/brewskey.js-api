// @flow
import type {
  Permission,
  PermissionMutator,
} from '../index';

import DefaultTranslator from './DefaultTranslator';

class PermissionTranslator extends DefaultTranslator<
  Permission,
  PermissionMutator<*>
> {
  toApi(
    {
      entity,
      entityType,
      user,
      organization,
      ...props
    }: PermissionMutator<*>,
  ): Object {
    return {
      ...props,
      deviceId: entityType === 'devices'
        ? entity.id
        : null,
      locationId: entityType === 'locations'
        ? entity.id
        : null,
      organizationId: entityType === 'organizations'
        ? entity.id
        : null,
      tapId: entityType === 'taps'
        ? entity.id
        : null,
      userId: user.id,
    };
  }
}

export default PermissionTranslator;
