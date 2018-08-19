// @flow
import type { Tap, TapMutator } from '../index';

import DAO from './DAO';
import { DAO_ENTITIES } from '../constants';
import TapTranslator from '../translators/TapTranslator';

class TapDAO extends DAO<Tap, TapMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.TAPS,
      navigationProperties: {
        currentKeg: {
          expand: { beverage: { select: ['id', 'name'] } },
          select: ['id', 'kegType', 'maxOunces', 'ounces'],
        },
        device: { select: ['id', 'isDeleted', 'name'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new TapTranslator(),
    });
  }
}

export default new TapDAO();
