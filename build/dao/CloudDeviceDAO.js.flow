// @flow

import type { CloudEvent } from '../CloudSSEManager';
import type { EntityID } from '../types';

import RestDAO from './RestDAO';
import CloudSSEManager from '../CloudSSEManager';

const DEVICE_ONLINE_STATUS_EVENT_NAME = 'spark/status';

export type CloudDevice = {|
  cellural: ?boolean,
  connected: boolean,
  current_build_target: ?string,
  functions: Array<string>,
  id: EntityID,
  imei: ?string,
  last_app: ?string,
  last_heard: ?Date,
  last_iccid: ?string,
  last_ip_address: ?string,
  name: string,
  platform_id: number,
  product_firmware_version: ?number,
  product_id: ?number,
  status: string,
  variables: Object,
|};

class CloudDeviceDAO extends RestDAO<CloudDevice, CloudDevice> {
  _isOnlineStatusListenerToggled: boolean = false;

  constructor() {
    super({ entityName: 'cloud-devices' });
  }

  getOne(particleId: string) {
    return this.__getOne(`api/v2/cloud-devices/${particleId}/`, particleId, {
      reformatError: error => error.error,
    });
  }

  flash(particleId: string, file: any) {
    return this.__fetchOne(`api/v2/cloud-devices/${particleId}/flash/`, {
      body: JSON.stringify({ file, particleId }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'PUT',
      reformatError: error => error.error,
    });
  }

  startOnlineStatusListener() {
    if (this._isOnlineStatusListenerToggled) {
      return;
    }

    CloudSSEManager.subscribe(this._onNewCloudSystemEvent, {
      eventNamePrefix: 'spark',
    });
  }

  stopOnlineStatusListener() {
    CloudSSEManager.unsubscribe(this._onNewCloudSystemEvent);
  }

  toggleOnlineStatusListener() {
    if (!this._isOnlineStatusListenerToggled) {
      this.startOnlineStatusListener();
    } else {
      this.stopOnlineStatusListener();
    }
  }

  _onNewCloudSystemEvent(cloudEvent: CloudEvent) {
    const { data, name, particleId } = cloudEvent;
    if (name !== DEVICE_ONLINE_STATUS_EVENT_NAME) {
      return;
    }

    const loader = this._entityLoaderById.get(particleId);
    if (!loader) {
      return;
    }

    this._entityLoaderById.set(
      particleId,
      loader.map(cloudDevice => ({
        ...cloudDevice,
        connected: data === 'online',
      })),
    );
    this.__emitChanges();
  }
}

export default new CloudDeviceDAO();
