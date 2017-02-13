// @flow

import type { Headers } from 'brewskey.js-api';

import oHandler from 'odata';

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

class DAOApi {
  AccountDAO: typeof AccountDAO;
  AvailabilityDAO: typeof AvailabilityDAO;
  BeverageDAO: typeof BeverageDAO;
  DeviceDAO: typeof DeviceDAO;
  GlassDAO: typeof GlassDAO;
  KegDAO: typeof KegDAO;
  LocationDAO: typeof LocationDAO;
  PermissionDAO: typeof PermissionDAO;
  PourDAO: typeof PourDAO;
  ScheduleDAO: typeof ScheduleDAO;
  SrmDAO: typeof SrmDAO;
  StyleDAO: typeof StyleDAO;
  TapDAO: typeof TapDAO;

  constructor({ endpoint, headers }: OConfig) {
    oHandler().config({
      endpoint,
      headers: [
        { name: 'Prefer', value: 'return=representation' },
        ...(headers || []),
      ],
    });

    this.AccountDAO = AccountDAO;
    this.AvailabilityDAO = AvailabilityDAO;
    this.BeverageDAO = BeverageDAO;
    this.DeviceDAO = DeviceDAO;
    this.GlassDAO = GlassDAO;
    this.KegDAO = KegDAO;
    this.LocationDAO = LocationDAO;
    this.PermissionDAO = PermissionDAO;
    this.PourDAO = PourDAO;
    this.ScheduleDAO = ScheduleDAO;
    this.SrmDAO = SrmDAO;
    this.StyleDAO = StyleDAO;
    this.TapDAO = TapDAO;
  }

  getHeaders = (): Headers =>
    oHandler().oConfig.headers || [];

  setHeaders = (headers: Headers) => {
    oHandler().config({
      headers,
    });
  }
}

export default DAOApi;
