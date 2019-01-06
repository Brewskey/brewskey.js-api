// @flow

import nullthrows from 'nullthrows';
import Config from './Config';
import Headers from './Headers';

const parseError = (error: Object): string => {
  if (error.ModelState) {
    let resultErrorMessage = '';
    Array.from(Object.values(error.ModelState)).forEach(
      (fieldErrorArray: any) => {
        const castedFieldErrorArray = (fieldErrorArray: Array<string>);

        new Set(castedFieldErrorArray).forEach(
          // eslint-disable-next-line no-return-assign
          (fieldError: string): string =>
            (resultErrorMessage = `${resultErrorMessage}\n${fieldError}`),
        );
      },
    );

    return resultErrorMessage;
  }

  if (error.error_description) {
    return error.error_description;
  }

  if (error.Message) {
    return error.Message;
  }

  return "Whoa! Brewskey had an error. We'll try to get it fixed soon.";
};

export default async (path: string, options?: Object = {}): Promise<any> => {
  const { reformatError, ...fetchOptions } = options;

  if (!Config.host) {
    throw new Error('DAOApi: no host set');
  }

  const headers = new Headers();
  if (Config.token) {
    headers.append('Authorization', `Bearer ${Config.token}`);
  }

  [...Headers, ...options.headers].forEach(({ name, value }) =>
    headers.append(name, value),
  );

  const { organizationId } = Config;
  let pathWithOrganization = path;
  if (organizationId) {
    pathWithOrganization = `${path}${
      path.includes('?') ? '&' : '?'
    }organizationID=${organizationId}`;
  }

  const response = await fetch(
    `${nullthrows(Config.host)}/${pathWithOrganization}`,
    {
      ...fetchOptions,
      headers,
    },
  );

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

    throw new Error(responseJson ? parseError(responseJson) : 'Whoops! Error!');
  }

  return responseJson;
};
