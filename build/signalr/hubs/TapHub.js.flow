// @flow

import type { Options } from './Hub';

import Hub from './Hub';

class TapHub extends Hub {
  subscribe: (tapId: string) => Promise<void> = this.serverMethod('subscribe');

  subscribeMany: (tapIds: Array<string>) => Promise<void> = this.serverMethod(
    'subscribeMany',
  );

  unsubscribe: (tapId: string) => Promise<void> = this.serverMethod(
    'unsubscribe',
  );

  unsubscribeMany: (tapIds: Array<string>) => Promise<void> = this.serverMethod(
    'unsubscribeMany',
  );

  constructor(options?: Options) {
    super(
      'tapHub',
      options ?? {
        logging: true,
      },
    );
  }

  withOptions(options: Options): TapHub {
    return new TapHub(options);
  }
}

export default new TapHub();
