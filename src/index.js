// @flow

import type { Headers } from 'brewskey.js-api';

import oHandler from 'odata';
import { DAO_ENTITIES, FILTER_OPERATORS } from './constants';

import apiFetch from './fetch';
import apiFilter from './filters';

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

type OConfig = {
  endpoint: string,
  headers?: Headers,
};

const initializeDAOApi = ({ endpoint, headers }: OConfig) => {
  oHandler().config({
    endpoint,
    headers: [
      { name: 'Prefer', value: 'return=representation' },
      ...(headers || []),
    ],
  });
};

const getHeaders = (): Headers =>
  oHandler().oConfig.headers || [];

const setHeaders = (headers: Headers) => {
  oHandler().config({
    headers,
  });
};

export default {
  AccountDAO,
  apiFetch,
  apiFilter,
  AvailabilityDAO,
  BeverageDAO,
  DAO_ENTITIES,
  DeviceDAO,
  FILTER_OPERATORS,
  getHeaders,
  GlassDAO,
  initializeDAOApi,
  KegDAO,
  LocationDAO,
  PermissionDAO,
  PourDAO,
  ScheduleDAO,
  setHeaders,
  SrmDAO,
  StyleDAO,
  TapDAO,
};
