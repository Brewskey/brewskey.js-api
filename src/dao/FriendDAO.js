// @flow
import type { Friend } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class FriendDAO extends DAO<Friend, Friend> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.FRIENDS,
      selectExpandQuery: {
        expand: {
          friendAccount: ['id', 'phoneNumber', 'userName'],
        },
      },
      translator: new DefaultTranslator(),
    });
  }
}

export default new FriendDAO();
