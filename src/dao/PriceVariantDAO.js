// @flow

import type { EntityID, ShortenedEntity } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type PriceVariant = {|
  id: EntityID,
  ounces: number,
  price: number,
  tap: ShortenedEntity,
|};

export type PriceVariantMutator = {|
  id: ?EntityID,
  ounces: number,
  price: number,
  tapId: EntityID,
|};

class PriceVariantDAO extends ODataDAO<PriceVariant, PriceVariantMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.PRICE_VARIANTS,
      navigationProperties: {
        tap: { select: ['id', 'isDeleted', 'name'] },
      },
      translator: new DefaultTranslator(),
    });
  }
}

export default new PriceVariantDAO();
