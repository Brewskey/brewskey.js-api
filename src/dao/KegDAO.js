// @flow

import type { EntityID, Keg } from '../index';

import DAO from './DAO';
import KegTranslator from '../translators/KegTranslator';
import LoadObject from '../load_object/LoadObject';
import { DAO_ENTITIES } from '../constants';
import { createFilter } from '../filters';

class KegDAO extends DAO<Keg, Keg> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.KEGS,
      selectExpandQuery: {
        expand: {
          beverage: ['id', 'isDeleted', 'name'],
          location: ['id', 'isDeleted', 'name'],
          organization: ['id', 'isDeleted', 'name'],
          tap: ['id', 'isDeleted', 'name'],
        },
      },
      translator: new KegTranslator(),
    });
  }

  fetchKegByTapID = (tapId: EntityID): LoadObject<Array<LoadObject<Keg>>> =>
    this.fetchMany({
      filters: [createFilter('tap/id').equals(tapId)],
      orderBy: [
        {
          column: 'tapDate',
          direction: 'desc',
        },
      ],
      take: 1,
    });
}

export default new KegDAO();
