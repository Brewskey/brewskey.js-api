// @flow
import type { Permission, PermissionMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PermissionTranslator from '../translators/PermissionTranslator';

class PermissionDAO extends DAO<Permission, PermissionMutator<*>> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.PERMISSIONS,
      selectExpandQuery: {
        expand: {
          createdBy: ['id', 'userName'],
          device: ['id', 'isDeleted', 'name'],
          forUser: ['id', 'userName'],
          location: ['id', 'isDeleted', 'name'],
          organization: ['id', 'isDeleted', 'name'],
          tap: ['id', 'isDeleted', 'name'],
        },
      },
      translator: new PermissionTranslator(),
    });
  }
}

export default new PermissionDAO();
