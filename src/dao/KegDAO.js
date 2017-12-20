// @flow

import type { Keg, KegMutator, KegType, KegTypeProps } from '../index';

import DAO from './DAO';
import KegTranslator from '../translators/KegTranslator';
import LoadObject from '../LoadObject';
import { DAO_ENTITIES } from '../constants';
import { createFilter } from '../filters';

export const KEG_PROPS_BY_TYPE: { [KegType]: KegTypeProps } = {
  Cornelius: { name: 'Cornelius Keg', size: 640 },
  HalfBarrel: { name: 'Half Barrel Keg', size: 1984 },
  Mini: { name: 'Mini Keg', size: 169 },
  QuarterBarrel: { name: 'Quarter Barrel Keg', size: 992 },
  SixthBarrel: { name: 'Sixth Barrel Keg', size: 661 },
  SlimQuarter: { name: 'Slim Quarter Keg', size: 992 },
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
