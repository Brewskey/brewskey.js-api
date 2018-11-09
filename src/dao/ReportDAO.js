// @flow
import type { Report, ReportMutator } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import ReportTranslator from '../translators/ReportTranslator';

class ReportDAO extends ODataDAO<Report, ReportMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.REPORTS,
      navigationProperties: {
        devices: { select: ['id', 'isDeleted', 'name'] },
        locations: { select: ['id', 'isDeleted', 'name'] },
        taps: { select: ['id', 'isDeleted'] },
      },
      translator: new ReportTranslator(),
    });
  }
}

export default new ReportDAO();
