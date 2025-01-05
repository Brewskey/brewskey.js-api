import type { EntityID, ShortenedEntity } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import PermissionTranslator, {
  ApiPermissionMutator,
} from '../translators/PermissionTranslator';
import { createFilter } from '../filters';

export type PermissionEntityKeysType =
  | 'device'
  | 'location'
  | 'organization'
  | 'tap';

export type PermissionEntityType = `${PermissionEntityKeysType}s`;

export type PermissionType =
  | 'Administrator'
  | 'Edit'
  | 'Read'
  | 'BannedFromTap';

export type Permission = {
  createdBy: {
    id: EntityID;
    userName: string;
  };
  createdDate: Date;
  device: ShortenedEntity | null | undefined;
  expiresDate: Date | null | undefined;
  forUser: {
    id: EntityID;
    userName: string;
  };
  id: EntityID;
  invalid: boolean;
  isDeleted: boolean;
  location: ShortenedEntity | null | undefined;
  organization: ShortenedEntity | null | undefined;
  permissionType: PermissionType;
  startDate: Date | null | undefined;
  tap: ShortenedTap | null | undefined;
};

export type PermissionMutator = {
  entityId: EntityID;
  entityType: PermissionEntityType;
  expiresDate: Date | null | undefined;
  id: EntityID | null | undefined;
  permissionType: PermissionType;
  startDate: Date | null | undefined;
  userId: EntityID;
};

class PermissionDAOImpl extends ODataDAO<
  Permission,
  PermissionMutator,
  Permission,
  ApiPermissionMutator
> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.PERMISSIONS,
      navigationProperties: {
        createdBy: { select: ['id', 'userName'] },
        device: { select: ['id', 'isDeleted', 'name'] },
        forUser: { select: ['id', 'userName'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
        tap: { select: ['id', 'isDeleted'] },
      },
      translator: new PermissionTranslator(),
    });
  }

  async fetchForEntityId(
    permissionEntityType: PermissionEntityKeysType,
    entityID: EntityID,
  ): Promise<Permission> {
    const result = await this.fetchMany({
      filters: [createFilter(`${permissionEntityType}/id`).equals(entityID)],
      orderBy: [
        {
          column: 'createdDate',
          direction: 'desc',
        },
      ],
      take: 1,
    });
    return result[0];
  }
}

export const PermissionDAO = new PermissionDAOImpl();
