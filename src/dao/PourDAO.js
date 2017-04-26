// @flow
import type { DAOChartParams, Pour } from '../index';
import type DAOResult from './DAOResult';

import oHandler from 'odata';
import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import PourTranslator from '../translators/PourTranslator';

class PourDAO extends DAO<Pour, Pour> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: ['id', 'isDeleted', 'name'],
        location: ['id', 'isDeleted', 'name'],
        owner: ['id', 'userName'],
        tap: ['id', 'isDeleted', 'name'],
      },
      translator: new PourTranslator(),
    });
  }

  fetchChartData = (params: DAOChartParams): Promise<DAOResult<Object>> =>
    this._resolve(
      oHandler('chart'), // TODO this is a hacky crutch for change endpoint
      // on the fly..come up better solution,
      params,
      'post',
    );
}

export default new PourDAO();
