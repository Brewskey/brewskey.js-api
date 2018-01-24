// @flow

import type { Keg } from '../index';
import type DAOResult from './DAOResult';

import DAO from './DAO';
import KegTranslator from '../translators/KegTranslator';
import { DAO_ENTITIES } from '../constants';
import { createFilter } from '../filters';

class KegDAO extends DAO<Keg, Keg> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.KEGS,
      navigationProperties: [
        { name: 'beverage', select: ['id', 'isDeleted', 'name'] },
        { name: 'location', select: ['id', 'isDeleted', 'name'] },
        { name: 'organization', select: ['id', 'isDeleted', 'name'] },
        { name: 'tap', select: ['id', 'isDeleted'] },
      ],
      translator: new KegTranslator(),
    });
  }

  fetchKegByTapID = (tapId: string): Promise<DAOResult<Keg>> =>
    this._resolve(
      this._buildHandler({
        filters: [createFilter('tap/id').equals(tapId)],
        orderBy: [
          {
            column: 'tapDate',
            direction: 'desc',
          },
        ],
        take: 1,
      }),
    );
}

export default new KegDAO();
