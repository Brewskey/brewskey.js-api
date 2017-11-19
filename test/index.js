const FormData = require('form-data');
const fetch = require('node-fetch');
const minimist = require('minimist');
import DAOApi from '../src/index';

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
  await DAOApi.PourDAO.waitForLoaded(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('FIRST LOAD');
  DAOApi.PourDAO.flushCache();

  console.time('SECOND LOAD');
  await DAOApi.PourDAO.waitForLoaded(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('SECOND LOAD');
  DAOApi.PourDAO.flushCache();

  console.time('GET SINGLE');
  await DAOApi.PourDAO.waitForLoaded(() => DAOApi.PourDAO.fetchByID(58));
  console.timeEnd('GET SINGLE');
  DAOApi.PourDAO.flushCache();

  console.time('THIRD LOAD');
  await DAOApi.PourDAO.waitForLoaded(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('THIRD LOAD');
  DAOApi.PourDAO.flushCache();

  console.time('CACHE LOAD');
  await DAOApi.PourDAO.waitForLoaded(() => DAOApi.PourDAO.fetchMany(query));
  console.timeEnd('CACHE LOAD');
  console.time('CACHE GET SINGLE');
  await DAOApi.PourDAO.waitForLoaded(() => DAOApi.PourDAO.fetchByID(58));
  console.timeEnd('CACHE GET SINGLE');
}());
