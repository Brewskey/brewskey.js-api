// @flow
import o from 'odata';
import config from './config';

o().config({
  endpoint: `${config.host}api/v2`,
  headers: [{ name: 'Prefer', value: 'return=representation' }],
});

export default o;
