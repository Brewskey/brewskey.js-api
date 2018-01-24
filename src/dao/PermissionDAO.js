// @flow
import type { Permission, PermissionMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PermissionTranslator from '../translators/PermissionTranslator';

class PermissionDAO extends DAO<Permission, PermissionMutator<*>> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.PERMISSIONS,
      navigationProperties: [
        { name: 'createdBy', select: ['id', 'userName'] },
        { name: 'device', select: ['id', 'isDeleted', 'name'] },
        { name: 'forUser', select: ['id', 'userName'] },
        { name: 'location', select: ['id', 'isDeleted', 'name'] },
        { name: 'organization', select: ['id', 'isDeleted', 'name'] },
        { name: 'tap', select: ['id', 'isDeleted'] },
      ],
      translator: new PermissionTranslator(),
    });
  }
}

export default new PermissionDAO();
