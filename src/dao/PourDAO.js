// @flow

import type { EntityID, ShortenedEntity } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import PourTranslator from '../translators/PourTranslator';
import Signalr from '../signalr';
import debounce from 'debounce';

const POURS_ACCUMULATE_TIMEOUT = 700;

export type Pour = {
  beverage: ?ShortenedEntity,
  id: EntityID,
  isDeleted: boolean,
  keg: { id: EntityID },
  location: ?ShortenedEntity,
  organization: ShortenedEntity,
  ounces: number,
  owner: { id: EntityID, userName: string },
  pourDate: string,
  pulses: number,
  tap: ?ShortenedTap,
};

class PourDAO extends ODataDAO<Pour, Pour> {
  isAutoflushToggled: boolean = true;

  _accumulatedIds: Set<EntityID> = new Set();

  constructor() {
    super({
      entityName: DAO_ENTITIES.POURS,
      navigationProperties: {
        beverage: { select: ['id', 'isDeleted', 'name'] },
        device: { select: ['id', 'isDeleted', 'name'] },
        keg: { select: ['id'] },
        location: { select: ['id', 'isDeleted', 'name'] },
        organization: { select: ['id', 'isDeleted', 'name'] },
        owner: { select: ['id', 'userName'] },
        tap: { select: ['id', 'isDeleted'] },
      },
      translator: new PourTranslator(),
    });

    Signalr.TapHub.registerListener('newPour', this._onNewPour);
  }

  startAutoflush = () => {
    if (this.isAutoflushToggled) {
      return;
    }
    this.flushQueryCaches();
    this.isAutoflushToggled = true;
  };

  stopAutoflush = () => {
    this.isAutoflushToggled = false;
  };

  toggleAutoflush = () => {
    if (this.isAutoflushToggled) {
      this.stopAutoflush();
    } else {
      this.startAutoflush();
    }
  };

  _onNewPourDebounced = debounce(() => {
    this.fetchByIDs(Array.from(this._accumulatedIds));

    if (this.isAutoflushToggled) {
      this._accumulatedIds.forEach(id => this.flushCacheForEntity(id));
      this.flushQueryCaches();
    }

    this._accumulatedIds.clear();
  }, POURS_ACCUMULATE_TIMEOUT);

  _onNewPour = (pourId: EntityID) => {
    this._accumulatedIds.add(pourId);
    this._onNewPourDebounced();
  };
}

export default new PourDAO();
