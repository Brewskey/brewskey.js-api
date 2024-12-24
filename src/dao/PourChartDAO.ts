import type { EntityID } from '../types';

import RestDAO from './RestDAO';
import qs from 'qs';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type PourChartByEntity = 'device' | 'location' | 'organization' | 'tap';

export type PourChartType = 'daily' | 'hourly' | 'timeline';

export type PourChartParams = {
  beginDate?: Date | null | undefined;
  byEntity: PourChartByEntity;
  chartType: PourChartType;
  endDate?: Date | null | undefined;
  ids?: Array<EntityID>;
};

export type PourChartResult = {
  entityResults: Array<{
    key: string;
    name: string;
  }>;
  resultSegments: Array<{
    dataSets: Array<{
      key: string;
      value: number;
    }>;
    key: string;
  }>;
};

class PourChartDAOImpl extends RestDAO<PourChartResult, null> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.POUR_CHART,
    });
  }

  fetchChartData = (params: PourChartParams): Promise<PourChartResult> => {
    const queryString = qs.stringify(
      {
        ...params,
        ids: params.ids ? params.ids.join(',') : null,
      },
      { skipNulls: true },
    );
    return this.__getOne(`api/v2/chart/GetChart/?${queryString}`);
  };
}

export const PourChartDAO = new PourChartDAOImpl();
