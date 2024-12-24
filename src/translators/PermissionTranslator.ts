import { EntityID } from '../types';
import type {
  Permission,
  PermissionMutator,
  PermissionEntityType,
  PermissionEntityKeysType,
} from '../dao/PermissionDAO';

import DefaultTranslator from './DefaultTranslator';

const PERMISSION_ENTITY_KEYS = ['device', 'location', 'organization', 'tap'];

// todo make DAO_ENTITIES and permissionType singular, it will allow
// simplify and reduce many annoying transformations.
// and we won't need to write shitty methods like this. :/
const getPermissionEntityTypeFromModel = (
  // eslint-disable-next-line prefer-template
  model: Permission,
): PermissionEntityType =>
  `${
    (Object.entries(model).find((entry: [string, unknown]): boolean => {
      const key = entry[0];
      const value = entry[1];
      return PERMISSION_ENTITY_KEYS.includes(key) && !!value;
    }) || {})[0]
  }s` as unknown as PermissionEntityType;

export type ApiPermissionMutator = Omit<
  PermissionMutator,
  'entityType' | 'entityId'
> & {
  deviceId: EntityID | null;
  locationId: EntityID | null;
  organizationId: EntityID | null;
  tapId: EntityID | null;
};

class PermissionTranslator extends DefaultTranslator<
  Permission,
  PermissionMutator,
  Permission,
  ApiPermissionMutator
> {
  toApi({
    entityId,
    entityType,
    ...props
  }: PermissionMutator): ApiPermissionMutator {
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
      // This doesn't seem right...?
      entityId: model[
        permissionEntityType.slice(0, -1) as unknown as PermissionEntityKeysType
      ] as unknown as EntityID,
      entityType: permissionEntityType,
      userId: model.forUser.id,
    };
  }
}

export default PermissionTranslator;
