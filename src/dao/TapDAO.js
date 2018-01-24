// @flow
import type { Tap, TapMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

class TapDAO extends DAO<Tap, TapMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.TAPS,
      navigationProperties: [
        { name: 'device', select: ['id', 'isDeleted', 'name'] },
        { name: 'location', select: ['id', 'isDeleted', 'name'] },
        { name: 'organization', select: ['id', 'isDeleted', 'name'] },
        {
          expand: [{ name: 'beverage', select: ['id', 'name'] }],
          name: 'currentKeg',
          select: ['id'],
        },
      ],
      translator: new TapTranslator(),
    });
  }
}

export default new TapDAO();
