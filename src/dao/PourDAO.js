// @flow
import type { ODataAction, ODataChartParams, Pour } from 'brewskey.js-api';

import DAO from './DAO';
import oHandler from '../handler';
import { DAO_ACTIONS, DAO_ENTITIES } from '../constants';
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

  fetchChartData(
    params: ODataChartParams,
    chartName: string,
  ): ODataAction<Pour> {
    const action = this.__query(
      DAO_ACTIONS.FETCH_CHART_DATA,
      {},
      params,
      { chartName },
    );

    action.method = 'post';
    action.oHandler = oHandler('chart');
    return action;
  }
}

export default new PourDAO();
