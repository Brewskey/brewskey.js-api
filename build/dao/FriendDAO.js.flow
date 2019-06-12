// @flow

import type { EntityID } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';
import daoFetch from '../fetch';

export type FriendStatus =
  | 'Approved'
  | 'AwaitingApproval'
  | 'Blocked'
  | 'Pending'
  | 'Spam';

export type Friend = {
  createdDate: Date,
  friendAccount: {
    id: EntityID,
    userName: string,
  },
  friendStatus: FriendStatus,
  id: EntityID,
  owningAccount: {
    id: EntityID,
    userName: string,
  },
};

export const FRIEND_STATUSES: { [key: string]: FriendStatus } = {
  APPROVED: 'Approved',
  AWAITING_APPROVAL: 'AwaitingApproval',
  BLOCKED: 'Blocked',
  PENDING: 'Pending',
  SPAM: 'Spam',
};

class FriendDAO extends ODataDAO<Friend, Friend> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.FRIENDS,
      navigationProperties: {
        friendAccount: { select: ['id', 'userName'] },
        owningAccount: { select: ['id', 'userName'] },
      },
      translator: new DefaultTranslator(),
    });
  }

  addFriend(userNameOrEmail: string): Promise<*> {
    return daoFetch('api/v2/friends/Default.addByUserName()/', {
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
