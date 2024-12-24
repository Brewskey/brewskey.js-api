import Subscription from './dao/Subscription';
import nullthrows from 'nullthrows';
import Config from './Config';

export type SSESubscriptionOptions = {
  eventNamePrefix?: string;
  onError?: (event: MessageEvent) => unknown;
  onOpen?: (event: MessageEvent) => unknown;
  particleId?: string;
};

export type CloudEvent = {
  data: Record<string, never>;
  name: string;
  particleId: string;
  publishedAt: Date;
};

type SSEHandler = (event: CloudEvent) => void;

class CloudSSEManager extends Subscription {
  static _sessionByHandler: Map<SSEHandler, EventSource> = new Map();

  static subscribe(
    handler: SSEHandler,
    subscribeOptions: SSESubscriptionOptions,
  ) {
    const { onError, onOpen } = subscribeOptions;

    const session = new EventSource(CloudSSEManager._getUrl(subscribeOptions));

    session.addEventListener('message', (sseEvent: MessageEvent): void => {
      try {
        const cloudEventStr = sseEvent.data;
        const cloudEvent = JSON.parse(cloudEventStr);

        const {
          name,
          coreid: particleId,
          data,
          published_at: publishedAt,
        } = cloudEvent;

        handler({ data, name, particleId, publishedAt });
      } catch (error: unknown) {
        if (error instanceof Error) {
          CloudSSEManager.__emitError(error);
          if (onError) {
            onError(sseEvent);
          }
        }
      }
    });

    if (onOpen) {
      session.addEventListener('open', onOpen);
    }

    if (onError) {
      session.addEventListener('error', onError);
    }

    session.addEventListener('error', (event: Event) => {
      CloudSSEManager.__emitError(new Error(JSON.stringify(event)));
    });

    CloudSSEManager._sessionByHandler.set(handler, session);
  }

  static unsubscribe(handler: SSEHandler) {
    const session = CloudSSEManager._sessionByHandler.get(handler);
    if (!session) {
      return;
    }
    session.close();
    CloudSSEManager._sessionByHandler.delete(handler);
  }

  static _getUrl({ eventNamePrefix = '', particleId }: SSESubscriptionOptions) {
    const devicesUrl = particleId ? `devices/${particleId}/events/` : 'events/';

    return `${nullthrows(
      Config.host,
    )}/api/v2/${devicesUrl}${eventNamePrefix}/?access_token=${nullthrows(
      Config.token,
    )}`;
  }
}

export default CloudSSEManager;
