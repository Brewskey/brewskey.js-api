// @flow
import type { PourChartParams, PourChartDataSet } from '../index';

import BaseDAO from './BaseDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

class PourChartDAO extends BaseDAO<PourChartDataSet, PourChartDataSet> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POUR_CHART,
      translator: new DefaultTranslator(),
    });
  }

  fetchChartData = (params: PourChartParams): Promise<PourChartDataSet> =>
    this.__resolveSingle(this.__buildHandler(), params, 'post');
}

export default new PourChartDAO();
