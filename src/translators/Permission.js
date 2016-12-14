// @flow
import type { Permission, PermissionMutator } from '../types';

import DefaultTranslator from './Default';

class PermissionTranslator extends DefaultTranslator<
  Permission,
  PermissionMutator,
> {
  toApi(mutator: PermissionMutator): Object {
    return {
      deviceId: mutator.entityType === 'devices'
        ? mutator.entityId
        : null,
      expiresDate: mutator.expiresDate,
      id: mutator.id,
      locationId: mutator.entityType === 'locations'
        ? mutator.entityId
        : null,
      permissionType: mutator.permissionType,
      startDate: mutator.startDate,
      tapId: mutator.entityType === 'taps'
        ? mutator.entityId
        : null,
      userId: mutator.userId,
    };
  }
}

export default PermissionTranslator;
