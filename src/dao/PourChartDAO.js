// @flow

import BaseODataDAO from './BaseODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type PourChartDataType =
  | 'all-with-tap-id'
  | 'by-location'
  | 'by-tap'
  | 'hourly-by-location'
  | 'hourly-by-tap';

export type PourChartParams = {
  beginDate?: ?Date,
  chartType: PourChartDataType,
  endDate?: ?Date,
  ids?: Array<string>,
};

export type PourChartDataEntry = {
  keys: Array<string>,
  value: number,
};

export type PourChartDataSet = {
  dataSet: Array<PourChartDataEntry>,
  key: string,
};

class PourChartDAO extends BaseODataDAO<PourChartDataSet, PourChartDataSet> {
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
