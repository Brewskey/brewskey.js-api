// @flow
import type { Friend, FriendStatus } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export const FRIEND_STATUSES: { [key: string]: FriendStatus } = {
  APPROVED: 'Approved',
  BLOCKED: 'Blocked',
  PENDING: 'Pending',
  SPAM: 'Spam',
};

class FriendDAO extends DAO<Friend, Friend> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.FRIENDS,
      navigationProperties: {
        friendAccount: { select: ['id', 'phoneNumber', 'userName'] },
      },
      translator: new DefaultTranslator(),
    });
  }
}

export default new FriendDAO();
