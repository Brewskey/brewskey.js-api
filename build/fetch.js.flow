// @flow

import oHandler from 'odata';

export default async (path: string, options?: Object = {}): Promise<*> => {
  const { reformatError, ...fetchOptions } = options;
  const { endpoint, headers: oheaders = [] } = oHandler().oConfig;

  if (!endpoint) {
    throw new Error('no-ohandler-endpoint');
  }

  const headers = new Headers();
  oheaders.forEach(({ name, value }) => headers.append(name, value));

  (options.headers || []).forEach(({ name, value }) =>
    headers.append(name, value),
  );

  const response = await fetch(`${endpoint}${path}`, {
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
