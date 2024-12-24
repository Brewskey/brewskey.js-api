import type { CloudEvent } from '../CloudSSEManager';
import type { EntityID } from '../types';

import RestDAO from './RestDAO';
import CloudSSEManager from '../CloudSSEManager';

const DEVICE_ONLINE_STATUS_EVENT_NAME = 'spark/status';

export type CloudDevice = {
  cellural: boolean | null | undefined;
  connected: boolean;
  current_build_target: string | null | undefined;
  functions: Array<string>;
  id: EntityID;
  imei: string | null | undefined;
  last_app: string | null | undefined;
  last_heard: Date | null | undefined;
  last_iccid: string | null | undefined;
  last_ip_address: string | null | undefined;
  name: string;
  platform_id: number;
  product_firmware_version: number | null | undefined;
  product_id: number | null | undefined;
  status: string;
  variables: Record<string, unknown>;
};

class CloudDeviceDAOImpl extends RestDAO<CloudDevice, CloudDevice> {
  _isOnlineStatusListenerToggled: boolean = false;

  constructor() {
    super({ entityName: 'cloud-devices' });
  }

  getOne(particleId: string) {
    return this.__getOne(`api/v2/cloud-devices/${particleId}/`, {
      reformatError: (error) => error.error,
    });
  }

  flash(particleId: string, file: File) {
    return this.__fetchOne(`api/v2/cloud-devices/${particleId}/flash/`, {
      body: JSON.stringify({ file, particleId }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'PUT',
      reformatError: (error) => error.error,
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

  _onNewCloudSystemEvent = (cloudEvent: CloudEvent) => {
    const { data, name, particleId } = cloudEvent;
    if (name !== DEVICE_ONLINE_STATUS_EVENT_NAME) {
      return;
    }

    // TODO - update query client

    // this.__updateEntityByID(particleId, cloudDevice => ({
    //   ...cloudDevice,
    //   connected: data === 'online',
    // }));
  };
}

export const CloudDeviceDAO = new CloudDeviceDAOImpl();
