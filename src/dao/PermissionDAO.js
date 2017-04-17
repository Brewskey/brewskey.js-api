// @flow

import type DAOResult from './DAOResult';
import type { Permission, PermissionMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PermissionTranslator from '../translators/PermissionTranslator';
import { createFilter } from '../filters';

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

  fetchPermissionsByUserID(userID: string): Promise<DAOResult<Permission>> {
    return this._resolve(this._buildHandler({
      filters: [createFilter('forUser/id').equals(userID)],
    }));
  }
}

export default new PermissionDAO();
