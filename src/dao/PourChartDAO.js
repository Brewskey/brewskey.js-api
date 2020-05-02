// @flow

import type { EntityID } from '../types';
import type LoadObject from '../LoadObject';

import RestDAO from './RestDAO';
import qs from 'qs';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type PourChartByEntity = 'device' | 'location' | 'organization' | 'tap';

export type PourChartType = 'daily' | 'hourly' | 'timeline';

export type PourChartParams = {|
  beginDate?: ?Date,
  byEntity: PourChartByEntity,
  chartType: PourChartType,
  endDate?: ?Date,
  ids?: Array<EntityID>,
|};

export type PourChartResult = {|
  entityResults: Array<{| key: string, name: string |}>,
  resultSegments: Array<{|
    dataSets: Array<{ key: string, value: number }>,
    key: string,
  |}>,
|};

class PourChartDAO extends RestDAO<PourChartResult, null> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POUR_CHART,
      translator: new DefaultTranslator(),
    });
  }

  fetchChartData = (params: PourChartParams): LoadObject<PourChartResult> => {
    const queryString = qs.stringify(
      {
        ...params,
        ids: params.ids ? params.ids.join(',') : null,
      },
      { skipNulls: true },
    );
    return this.__getOne(`api/v2/chart/GetChart/?${queryString}`, queryString);
  };
}

export default new PourChartDAO();
