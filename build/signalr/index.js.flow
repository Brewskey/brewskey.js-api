// @flow

import TapHub from './hubs/TapHub';

const startAll = async (): Promise<void> => {
  try {
    await TapHub.connect();
    await TapHub.subscribe('*');
  } catch (error) {
    // todo add some error handling logic..
    // maybe message in snackbar..or maybe just swallow it
  }
};

const stopAll = async (): Promise<void> => {
  try {
    await TapHub.unsubscribe('*');
    TapHub.disconnect();
  } catch (error) {
    // todo add some error handling logic..
    // maybe message in snackbar..or maybe just swallow it
  }
};

export default {
  startAll,
  stopAll,
  TapHub,
};
