// @flow

import type { Keg, KegMutator, KegType } from '../index';

import DAO from './DAO';
import KegTranslator from '../translators/KegTranslator';
import LoadObject from '../LoadObject';
import { DAO_ENTITIES } from '../constants';
import { createFilter } from '../filters';

export const MAX_OUNCES_BY_KEG_TYPE: { [KegType]: number } = {
  Cornelius: 640,
  HalfBarrel: 1984,
  Mini: 169,
  QuarterBarrel: 992,
  SixthBarrel: 661,
  SlimQuarter: 992,
};

class KegDAO extends DAO<Keg, KegMutator> {
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

  fetchKegByTapID = (tapId: string): LoadObject<Array<LoadObject<Keg>>> =>
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
