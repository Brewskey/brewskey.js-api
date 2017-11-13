require('babel-core/register');
require('babel-polyfill');

const FormData = require('form-data');
const fetch = require('node-fetch');
const minimist = require('minimist');
const DAOApi = require('../build/index').default;

const LoadObject = DAOApi.LoadObject;

const HOST = 'https://brewskey.com';
// const HOST = 'http://localhost:2484';
(async function () {
  const args = minimist(process.argv);

  if (!args.u || !args.p) {
    throw 'You must provide `u` and `p` parameters when running this script. ' +
      'An example would be `npm run test -- --u foo --p bar`';
  }

  const json = await fetch(`${HOST}/token/`, {
    method: 'POST',
    body: `grant_type=password&username=${args.u}&password=${args.p}`,
  }).then((response) => response.json());

  DAOApi.initializeDAOApi({
    endpoint: `${HOST}/api/v2/`,
  });

  const daoHeaders = DAOApi.getHeaders().filter(
    (header) =>
      header.name !== 'Authorization' && header.name !== 'timezoneOffset'
  );

  DAOApi.setHeaders([
    ...daoHeaders,
    {
      name: 'timezoneOffset',
      value: new Date().getTimezoneOffset().toString(),
    },
    {
      name: 'Authorization',
      value: `Bearer ${json.access_token}`,
    },
  ]);

  const result = null;
  const query = {
    take: 5,
  };
  console.time('FIRST LOAD');
  await loaderToPromise(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('FIRST LOAD');
  DAOApi.PourDAO.flushCache();

  console.time('SECOND LOAD');
  await loaderToPromise(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('SECOND LOAD');
  DAOApi.PourDAO.flushCache();

  console.time('GET SINGLE');
  await loaderToPromise(() => DAOApi.PourDAO.fetchByID(58));
  console.timeEnd('GET SINGLE');

  console.time('THIRD LOAD');
  await loaderToPromise(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('THIRD LOAD');

  console.time('CACHE LOAD');
  await loaderToPromise(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('CACHE LOAD');
  console.time('CACHE GET SINGLE');
  await loaderToPromise(() => DAOApi.PourDAO.fetchByID(58));
  console.timeEnd('CACHE GET SINGLE');
}());

const loaderToPromise = (fn) =>
  new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      let loader = fn();
      if (loader instanceof Map) {
        loader = LoadObject.withValue(Array.from(loader.values()));
      }

      loader.map((result) => {
        if (Array.isArray(result)) {
          if (
            result.some(
              (item) => (item instanceof LoadObject ? item.isLoading() : false)
            )
          ) {
            return LoadObject.loading();
          }
        }
        clearInterval(interval);
        resolve(result);
      });
      loader.mapError((error) => {
        clearInterval(interval);
        reject(error);
      });
    }, 100);
  });
