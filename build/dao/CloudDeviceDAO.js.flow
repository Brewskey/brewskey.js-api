// @flow

import type { CloudEvent } from '../CloudSSEManager';

import RestDAO from './RestDAO';
import CloudSSEManager from '../CloudSSEManager';
import LoadObject from '../LoadObject';

const DEVICE_ONLINE_STATUS_EVENT_NAME = 'spark/status';

class CloudDeviceDAO extends RestDAO<any, any> {
  _isOnlineStatusListenerToggled: boolean = false;

  getOne(particleId: string) {
    return this.__getOne(`cloud-devices/${particleId}/`, particleId);
  }

  flash(particleId: string, file: any) {
    return this.__fetchOne(`cloud-devices/${particleId}/flash/`, {
      body: JSON.stringify({ file, particleId }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'PUT',
      reformatError: error => error.error,
    });
  }

  toggleOnlineStatusListener() {
    if (!this._isOnlineStatusListenerToggled) {
      CloudSSEManager.subscribe(this._onNewCloudSystemEvent, {
        eventNamePrefix: 'spark',
      });
    } else {
      CloudSSEManager.unsubscribe(this._onNewCloudSystemEvent);
    }
  }

  _onNewCloudSystemEvent(cloudEvent: CloudEvent) {
    const { data, name, particleId } = cloudEvent;
    if (name !== DEVICE_ONLINE_STATUS_EVENT_NAME) {
      return;
    }

    const loader = this._entityLoaderById.get(particleId);
    if (!loader || !loader.hasValue()) {
      return;
    }

    this._entityLoaderById.set(
      particleId,
      LoadObject.withValue({
        ...loader.getValueEnforcing(),
        connected: data === 'online',
      }),
    );
    this.__emitChanges();
  }
}

export default new CloudDeviceDAO();
