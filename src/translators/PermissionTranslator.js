// @flow
import type {
  Permission,
  PermissionMutator,
  PermissionEntityType,
} from '../dao/PermissionDAO';

import DefaultTranslator from './DefaultTranslator';

const PERMISSION_ENTITY_KEYS = ['device', 'location', 'organization', 'tap'];

// todo make DAO_ENTITIES and permissionType singular, it will allow
// simplify and reduce many annoying transformations.
// and we won't need to write shitty methods like this. :/
const getPermissionEntityTypeFromModel = (
  model: Permission,
  // eslint-disable-next-line prefer-template
): PermissionEntityType =>
  (`${
    (Object.entries(model).find((entry: [string, mixed]): boolean => {
      const key = entry[0];
      const value = entry[1];
      return PERMISSION_ENTITY_KEYS.includes(key) && !!value;
    }) || {})[0]
  }s`: any);

class PermissionTranslator extends DefaultTranslator<
  Permission,
  PermissionMutator,
> {
  toApi({ entityId, entityType, ...props }: PermissionMutator): Object {
    return {
      ...props,
      deviceId: entityType === 'devices' ? entityId : null,
      locationId: entityType === 'locations' ? entityId : null,
      organizationId: entityType === 'organizations' ? entityId : null,
      tapId: entityType === 'taps' ? entityId : null,
    };
  }

  toForm(model: Permission): PermissionMutator {
    const permissionEntityType = getPermissionEntityTypeFromModel(model);

    return {
      ...model,
      entityId: model[permissionEntityType.slice(0, -1)],
      entityType: permissionEntityType,
      userId: model.forUser.id,
    };
  }
}

export default PermissionTranslator;
