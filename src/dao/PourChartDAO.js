// @flow

import type LoadObject from '../LoadObject';

import ODataDAO from './ODataDAO';
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

class PourChartDAO extends ODataDAO<PourChartDataSet, PourChartDataSet> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POUR_CHART,
      translator: new DefaultTranslator(),
    });
  }

  fetchChartData = (params: PourChartParams): LoadObject<PourChartDataSet> =>
    this.__fetchCustom(
      { handler: this.__buildHandler(), method: 'post', params },
      {} /* queryOptions */,
      JSON.stringify(params),
    );
}

export default new PourChartDAO();
