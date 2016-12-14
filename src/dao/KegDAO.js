// @flow
import type { Keg, ODataAction } from '../types';

import DefaultTranslator from '../translators/DefaultTranslator';
import DAO from './DAO';
import {
  DAO_ACTIONS,
  DAO_ENTITIES,
  FILTER_OPERATORS,
} from '../constants';

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

  fetchKegByTapID(tapId: string): ODataAction<Keg> {
    const idFilter = {
      operator: FILTER_OPERATORS.EQUALS,
      params: ['tap/id'],
      values: [tapId],
    };

    const queryOptions = {
      filters: [idFilter],
      orderBy: [{
        column: 'tapDate',
        direction: 'desc',
      }],
      take: 1,
    };

    return this.__query(
      DAO_ACTIONS.FETCH_KEG_BY_TAP_ID,
      queryOptions,
    );
  }
}

export default new KegDAO();
