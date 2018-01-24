// @flow
import type { Report, ReportMutator } from '../index';

import DefaultTranslator from './DefaultTranslator';

export const CADENCE_MAP = {
  Biweekly: 3,
  Daily: 1,
  Monthly: 4,
  OneTime: 0,
  Weekly: 2,
};

class ReportTranslator extends DefaultTranslator<Report, ReportMutator> {
  toApi({
    devices,
    locations,
    sendToEmails,
    taps,
    ...props
  }: ReportMutator): Object {
    return {
      ...props,
      deviceIds: devices
        ? devices.map(
            (device: { id: string, name: string }): string => device.id,
          )
        : [],
      locationIds: locations
        ? locations.map(
            (location: { id: string, name: string }): string => location.id,
          )
        : [],
      sendToEmails: sendToEmails.map(
        (emailObject: { email: string }): string => emailObject.email,
      ),
      tapIds: taps ? taps.map((tap: { id: string }): string => tap.id) : [],
    };
  }

  toForm(report: Report): Object {
    return {
      ...report,
      reportCadence: CADENCE_MAP[report.reportCadence],
      sendToEmails: report.sendToEmails.map((email: string): Object => ({
        email,
      })),
    };
  }
}

export default ReportTranslator;
