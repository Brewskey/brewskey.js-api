import type { RequestMethod } from './types';

import nullthrows from 'nullthrows';
import Config from './Config';
import StandardHeaders from './StandardHeaders';

const parseError = (
  error: Error & {
    ModelState?: Record<string, Array<string>>;
    error_description?: string;
    Message?: string;
  },
): string => {
  if (error.ModelState) {
    let resultErrorMessage = '';
    Array.from(Object.values(error.ModelState)).forEach((fieldErrorArray) => {
      const castedFieldErrorArray = fieldErrorArray as Array<string>;

      new Set(castedFieldErrorArray).forEach(
        // eslint-disable-next-line no-return-assign
        (fieldError: string): string =>
          (resultErrorMessage = `${resultErrorMessage}\n${fieldError}`),
      );
    });

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

export type ReformatErrorPayload = Error & {
  error: string;
  error_description?: string;
  invalidDeviceIds: string[];
  Message?: string;
  message?: string;
  ModelState?: Record<string, Array<string>>;
};

export type FetchOptions = {
  body?: BodyInit;
  headers?: Array<{
    name: string;
    value: string;
  }>;
  method?: RequestMethod;
  reformatError?: (error: ReformatErrorPayload) => string;
};

export default async <TResult>(
  path: string,
  options: FetchOptions = {},
): Promise<TResult> => {
  const {
    reformatError,
    headers: optionsHeaders = [],
    ...fetchOptions
  } = options;

  if (!Config.host) {
    throw new Error('DAOApi: no host set');
  }

  const headers = new Headers();
  if (Config.token) {
    headers.append('Authorization', `Bearer ${Config.token}`);
  }

  [...StandardHeaders, ...optionsHeaders].forEach(({ name, value }) =>
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

  const text = await response.text();
  let responseJson: TResult | string | null = null;
  if (text.length > 0) {
    const contentType = response.headers.get('Content-Type') ?? '';
    const looksLikeJson =
      contentType.includes('application/json') || /^\s*[\{[[]/.test(text);
    if (looksLikeJson) {
      try {
        responseJson = JSON.parse(text) as TResult;
      } catch {
        responseJson = text;
      }
    } else {
      responseJson = text;
    }
  }

  if (!response.ok) {
    const errorPayload =
      responseJson && typeof responseJson === 'object'
        ? (responseJson as unknown as Error & {
            ModelState?: Record<string, Array<string>>;
            error_description?: string;
            Message?: string;
            error?: string;
            invalidDeviceIds?: string[];
          })
        : null;
    const message =
      errorPayload && reformatError
        ? reformatError(errorPayload as ReformatErrorPayload)
        : errorPayload
          ? parseError(
              errorPayload as Error & {
                ModelState?: Record<string, Array<string>>;
                error_description?: string;
                Message?: string;
              },
            )
          : typeof responseJson === 'string'
            ? responseJson
            : 'Whoops! Error!';
    const error = new Error(message) as Error & { status: number };
    error.status = response.status;
    throw error;
  }

  return responseJson as TResult;
};
