import type { EntityID } from './types';

import oHandler from 'odata';
import { CADENCE_MAP } from './translators/ReportTranslator';
import Subscription from './dao/Subscription';

import fetch from './fetch';
import { createFilter, doesSatisfyQueryFilters } from './filters';
import StandardHeaders from './StandardHeaders';

import Config from './Config';
import { AuthResponse } from './Auth';

const initialize = (host: string) => {
  Config.host = host;

  oHandler().config({
    endpoint: `${host}/api/v2/`,
  });
};

const setToken = (token: string) => {
  Config.token = token;

  oHandler().config({
    headers: [
      ...StandardHeaders,
      {
        name: 'Authorization',
        value: `Bearer ${token}`,
      },
    ],
  });
};

const setRefreshToken = (refreshToken: string) => {
  Config.refreshToken = refreshToken;
};

const setOnSessionUpdated = (
  callback: (refreshToken: AuthResponse) => void,
) => {
  Config.onSessionUpdated = callback;
};

const setOrganizationID = (organizationID?: EntityID | null) => {
  Config.organizationId = organizationID;
};

export * from './Auth';
export * from './dao/AccountDAO';
export * from './dao/AchievementDAO';
export * from './dao/AvailabilityDAO';
export * from './dao/BeverageDAO';
export * from './dao/CloudDeviceDAO';
export * from './dao/DeviceDAO';
export * from './dao/FlowSensorDAO';
export * from './dao/FriendDAO';
export * from './dao/GlassDAO';
export * from './dao/KegDAO';
export * from './dao/LocationDAO';
export * from './dao/OrganizationDAO';
export * from './dao/PermissionDAO';
export * from './dao/PaymentsDAO';
export * from './dao/PourChartDAO';
export * from './dao/PourDAO';
export * from './dao/PriceVariantDAO';
export * from './dao/ProductDAO';
export * from './dao/ProductDeviceDAO';
export * from './dao/ProductFirmwareDAO';
export * from './dao/ReportDAO';
export * from './dao/ScheduleDAO';
export * from './dao/SrmDAO';
export * from './dao/StyleDAO';
export * from './dao/TapDAO';

export * from './constants';
export * from './types';
export * from './CloudSSEManager';
export { default as RestDAO } from './dao/RestDAO';
export { default as ODataDAO } from './dao/ODataDAO';
export * from './utils/deepIdCast';

export { CADENCE_MAP };

export default {
  createFilter,
  doesSatisfyQueryFilters,
  fetch,
  initialize,
  onError: Subscription.onError,
  setOrganizationID,
  setToken,
  setRefreshToken,
  setOnSessionUpdated,
};
