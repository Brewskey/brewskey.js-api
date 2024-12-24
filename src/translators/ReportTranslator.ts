import type { EntityID, ShortenedEntity } from '../types';
import type { ShortenedTap } from '../dao/TapDAO';
import type { Report, ReportCadence, ReportMutator } from '../dao/ReportDAO';

import DefaultTranslator from './DefaultTranslator';

export const CADENCE_MAP = {
  Biweekly: 3,
  Daily: 1,
  Monthly: 4,
  OneTime: 0,
  Weekly: 2,
} as const;

export type ApiReportMutator = Omit<
  ReportMutator,
  'devices' | 'locations' | 'sendToEmails' | 'taps'
> & {
  deviceIds: EntityID[];
  locationIds: EntityID[];
  tapIds: EntityID[];
  sendToEmails: string[];
};

// todo clean the translator when we will be merging loadObject to master
class ReportTranslator extends DefaultTranslator<
  Report,
  ReportMutator,
  Report,
  ApiReportMutator
> {
  toApi({
    devices,
    locations,
    sendToEmails,
    taps,
    ...props
  }: ReportMutator): ApiReportMutator {
    return {
      ...props,
      deviceIds: devices
        ? devices.map(({ id }: ShortenedEntity): EntityID => id)
        : [],
      locationIds: locations
        ? locations.map(({ id }: ShortenedEntity): EntityID => id)
        : [],
      sendToEmails: sendToEmails.map(
        ({ email }: { email: string }): string => email,
      ),
      tapIds: taps ? taps.map(({ id }: ShortenedTap): EntityID => id) : [],
    };
  }

  toForm(report: Report): ReportMutator {
    return {
      ...report,
      reportCadence: CADENCE_MAP[
        report.reportCadence
      ] as unknown as ReportCadence,
      sendToEmails: report.sendToEmails.map(
        (email: string): { email: string } => ({
          email,
        }),
      ),
    };
  }
}

export default ReportTranslator;
