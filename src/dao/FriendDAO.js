// @flow
import type { Friend, FriendStatus } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';
import daoFetch from '../fetch';

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

  addFriend(userNameOrEmail: string): Promise<*> {
    return daoFetch('friends/Default.addByUserName()/', {
      body: JSON.stringify({ userName: userNameOrEmail }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'post',
    });
  }
}

export default new FriendDAO();
