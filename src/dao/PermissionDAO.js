// @flow
import type { Permission, PermissionMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PermissionTranslator from '../translators/PermissionTranslator';

class PermissionDAO extends DAO<Permission, PermissionMutator<*>> {
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
}

export default new PermissionDAO();
