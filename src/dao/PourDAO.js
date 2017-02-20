// @flow
import type { DAOChartParams, Pour } from '../index';
import type DAOResult from './DAOResult';

import oHandler from 'odata';
import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class PourDAO extends DAO<Pour, Pour> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: ['id', 'name'],
        location: ['id', 'name'],
        owner: ['id', 'userName'],
        tap: ['id', 'name'],
      },
      translator: new DefaultTranslator(),
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
