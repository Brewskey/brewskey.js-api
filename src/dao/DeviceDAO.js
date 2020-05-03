// @flow

import type { EntityID, ShortenedEntity } from '../types';
import type LoadObject from '../LoadObject';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DeviceTranslator from '../translators/DeviceTranslator';

export type DeviceStatus =
  | 'Active'
  | 'Cleaning'
  | 'Configure'
  | 'Inactive'
  | 'Unlocked';

export type DeviceType = 'BrewskeyBox' | 'Onsite';

export type NFCStatus = 'PhoneOnly' | 'CardOnly' | 'PhoneAndCard' | 'Disabled';

export type Device = {|
  createdBy: {| id: EntityID, userName: string |},
  deviceStatus: DeviceStatus,
  deviceType: DeviceType,
  id: EntityID,
  isDeleted: boolean,
  isScreenDisabled: boolean,
  isTotpDisabled: boolean,
  lastEdited: Date,
  lastEditedBy: { id: EntityID, userName: string },
  ledBrightness: number,
  location?: ShortenedEntity,
  name: string,
  nfcStatus: NFCStatus,
  organization: ShortenedEntity,
  particleId: string,
  secondsToStayOpen: number,
  shouldInvertScreen: boolean,
  temperature: number,
  timeForValveOpen: number,
|};

export type DeviceMutator = {|
  deviceStatus: DeviceStatus,
  deviceType: DeviceType,
  id?: EntityID,
  isScreenDisabled: boolean,
  isTotpDisabled: boolean,
  ledBrightness: number,
  locationId: ?EntityID,
  name: string,
  nfcStatus: NFCStatus,
  particleId: string,
  secondsToStayOpen: number,
  shouldInvertScreen: boolean,
  timeForValveOpen: number,
|};

export type ParticleAttributes = {|
  cellular: ?string,
  connected: boolean,
  currentBuildTarget: ?string,
  functions: Array<string>,
  id: string,
  imei: ?string,
  lastApp: ?string,
  lastHeard: Date,
  lastIccid: ?string,
  lastIpAddress: string,
  name: string,
  platformId: number,
  productFirmwareVersion: number,
  productId: number,
  status: string,
|};

class DeviceDAO extends ODataDAO<Device, DeviceMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.DEVICES,
      navigationProperties: {
        createdBy: { select: ['id', 'userName'] },
        lastEditedBy: { select: ['id', 'userName'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new DeviceTranslator(),
    });
  }

  fetchParticleAttributes(deviceID: EntityID): LoadObject<ParticleAttributes> {
    const funcString = 'Default.particleAttributes()';
    const stringifiedID = deviceID.toString();

    const handler = this.__buildHandler({}, false).find(
      this.__reformatIDValue(stringifiedID),
    );
    handler.func(funcString);

    return this.__fetchCustom(handler, {}, `${funcString}${deviceID}`);
  }
}

export default new DeviceDAO();
