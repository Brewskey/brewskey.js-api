// @flow

import type { Header } from 'brewskey.js-api';

import oHandler from 'odata';

export default (path: string, options: ?Object): Promise<*> => {
  const {
    endpoint,
    headers: oheaders = [],
  } = oHandler().oConfig;

  if (!endpoint) {
    throw new Error('no-ohandler-endpoint');
  }

  const headers = new Headers();
  oheaders.forEach(({ name, value }: Header): void =>
    headers.append(name, value),
  );

  (options && options.headers || []).forEach(
    ({ name, value }: Header): void =>
    headers.append(name, value),
  );

  return fetch(
    `${endpoint}/${path}`,
    { ...options, headers },
  ).then((response: Object): Object => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }).then((response: Object): Object => response.json());
};
