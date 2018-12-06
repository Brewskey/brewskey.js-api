// @flow

import nullthrows from 'nullthrows';
import Config from './Config';

export default async (path: string, options?: Object = {}): Promise<*> => {
  const { reformatError, ...fetchOptions } = options;

  if (!Config.host) {
    throw new Error('DAOApi: no host set');
  }

  const headers = new Headers();
  if (Config.token) {
    headers.append('Authorization', `Bearer ${Config.token}`);
  }

  (options.headers || []).forEach(({ name, value }) =>
    headers.append(name, value),
  );

  const response = await fetch(`${nullthrows(Config.host)}/${path}`, {
    ...fetchOptions,
    headers,
  });

  let responseJson;
  try {
    responseJson = await response.json();
  } catch (error) {
    responseJson = null;
  }

  if (!response.ok) {
    if (responseJson && reformatError) {
      throw new Error(reformatError(responseJson));
    }

    throw new Error(
      (responseJson && responseJson.error && responseJson.error.message) ||
        'Whoops! Error!',
    );
  }

  return responseJson;
};
