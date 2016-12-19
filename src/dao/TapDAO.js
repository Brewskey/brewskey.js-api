// @flow
import type { Tap, TapMutator } from 'brewskey.js-api';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

class TapDAO extends DAO<Tap, TapMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.TAPS,
      navigationProperties: {
        device: ['id', 'name'],
        location: ['id', 'name'],
      },
      translator: new TapTranslator(),
    });
  }
}

export default new TapDAO();
