// @flow
import type { Permission, PermissionMutator } from '../types';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PermissionTranslator from '../translators/Permission';

class PermissionDAO extends DAO<Permission, PermissionMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.PERMISSIONS,
      navigationProperties: {
        createdBy: ['id', 'userName'],
        device: ['id', 'name'],
        forUser: ['id', 'userName'],
        location: ['id', 'name'],
        tap: ['id', 'name'],
      },
      translator: new PermissionTranslator(),
    });
  }
}

export default new PermissionDAO();
