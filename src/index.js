// @flow

import type { Headers, OConfig } from './index';

import oHandler from 'odata';
import { DAO_ENTITIES } from './constants';
import DAOResult from './dao/DAOResult';

import fetch from './fetch';
import { createFilter, doesSatisfyToQueryFilters } from './filters';

import AccountDAO from './dao/AccountDAO';
import AvailabilityDAO from './dao/AvailabilityDAO';
import BeverageDAO from './dao/BeverageDAO';
import DeviceDAO from './dao/DeviceDAO';
import GlassDAO from './dao/GlassDAO';
import KegDAO from './dao/KegDAO';
import LocationDAO from './dao/LocationDAO';
import PermissionDAO from './dao/PermissionDAO';
import PourDAO from './dao/PourDAO';
import ScheduleDAO from './dao/ScheduleDAO';
import SrmDAO from './dao/SrmDAO';
import StyleDAO from './dao/StyleDAO';
import TapDAO from './dao/TapDAO';

const initializeDAOApi = ({ endpoint, headers }: OConfig) => {
  oHandler().config({
    endpoint,
    headers: [
      { name: 'Prefer', value: 'return=representation' },
      ...(headers || []),
    ],
  });
};

const getHeaders = (): Headers => oHandler().oConfig.headers || [];

const setHeaders = (headers: Headers) => {
  oHandler().config({
    headers,
  });
};

export { DAO_ENTITIES, DAOResult };

/* eslint-disable sorting/sort-object-props */
export default {
  AccountDAO,
  AvailabilityDAO,
  BeverageDAO,
  DeviceDAO,
  GlassDAO,
  KegDAO,
  LocationDAO,
  PermissionDAO,
  PourDAO,
  ScheduleDAO,
  SrmDAO,
  StyleDAO,
  TapDAO,
  createFilter,
  doesSatisfyToQueryFilters,
  fetch,
  getHeaders,
  initializeDAOApi,
  setHeaders,
};
