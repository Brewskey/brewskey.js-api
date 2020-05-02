// @flow

import type { EntityID, ShortenedEntity } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import ReportTranslator from '../translators/ReportTranslator';

export type Report = {|
  createdDate: Date,
  devices: Array<ShortenedEntity>,
  id: EntityID,
  isDeleted: boolean,
  lastEdited: Date,
  locations: Array<ShortenedEntity>,
  name: string,
  reportCadence: ReportCadence,
  reportCadenceTimeStamp: Date,
  sendToEmails: Array<string>,
  taps: Array<ShortenedTap>,
|};

export type ReportMutator = {|
  devices?: Array<ShortenedEntity>,
  id?: EntityID,
  locations?: Array<ShortenedEntity>,
  name: string,
  reportCadence: ReportCadence,
  reportCadenceTimeStamp: Date,
  sendToEmails: Array<{ email: string }>,
  taps?: Array<ShortenedTap>,
|};

export type ReportCadence =
  | 'OneTime'
  | 'Daily'
  | 'Weekly'
  | 'Biweekly'
  | 'Monthly';

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
