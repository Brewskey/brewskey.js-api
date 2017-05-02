// @flow
import type { PourChartParams, PourChartDataItem } from '../index';
import type DAOResult from './DAOResult';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class PourChartDAO extends DAO<PourChartDataItem, PourChartDataItem> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POUR_CHART,
      translator: new DefaultTranslator(),
    });
  }

  deleteByID() {
    throw new Error('The method is not implemented.');
  }

  count() {
    throw new Error('The method is not implemented.');
  }

  fetchByID() {
    throw new Error('The method is not implemented.');
  }

  fetchByIDs() {
    throw new Error('The method is not implemented.');
  }

  fetchChartData = (
    params: PourChartParams,
  ): Promise<DAOResult<PourChartDataItem>> =>
    this._resolve(this._buildHandler(), params, 'post');

  fetchMany() {
    throw new Error('The method is not implemented.');
  }

  patch() {
    throw new Error('The method is not implemented.');
  }

  post() {
    throw new Error('The method is not implemented.');
  }

  put() {
    throw new Error('The method is not implemented.');
  }
}

export default new PourChartDAO();
