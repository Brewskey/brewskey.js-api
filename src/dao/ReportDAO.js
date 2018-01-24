// @flow
import type { Report, ReportMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import ReportTranslator from '../translators/ReportTranslator';

class ReportDAO extends DAO<Report, ReportMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.REPORTS,
      navigationProperties: [
        { name: 'devices', select: ['id', 'isDeleted', 'name'] },
        { name: 'locations', select: ['id', 'isDeleted', 'name'] },
        { name: 'taps', select: ['id', 'isDeleted'] },
      ],
      translator: new ReportTranslator(),
    });
  }
}

export default new ReportDAO();
