// @flow

import type { Keg } from '../index';
import type DAOResult from './DAOResult';

import DefaultTranslator from '../translators/DefaultTranslator';
import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import apiFilter from '../filters';

class KegDAO extends DAO<Keg, Keg> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.KEGS,
      navigationProperties: {
        location: ['id', 'name'],
        tap: ['id', 'name'],
      },
      translator: new DefaultTranslator(),
    });
  }

  fetchKegByTapID = (tapId: string): Promise<DAOResult<Keg>> =>
    this._resolve(this._buildHandler({
      filters: [apiFilter('tap/id').equals(tapId)],
      orderBy: [{
        column: 'tapDate',
        direction: 'desc',
      }],
      take: 1,
    }));
}

export default new KegDAO();
