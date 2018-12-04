// @flow

import TapHub from './hubs/TapHub';

const startAll = async (): Promise<void> => {
  await TapHub.connect();
  await TapHub.subscribe('*');
};

const stopAll = async (): Promise<void> => {
  await TapHub.unsubscribe('*');
  TapHub.disconnect();
};

export default {
  startAll,
  stopAll,
  TapHub,
};
