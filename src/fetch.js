// @flow
import oHandler from './handler';

export default (path: string, init: ?Object): Promise<*> => {
  const {
    endpoint,
    headers: oheaders = [],
  } = oHandler().oConfig;

  if (!endpoint) {
    throw new Error('no-ohandler-endpoint');
  }

  const headers = new Headers();
  oheaders.forEach(({ name, value }: { name: string, value: string }): void =>
    headers.append(name, value)
  );

  return fetch(
    `${endpoint}/${path}`,
    Object.assign({ headers }, init),
  );
};
