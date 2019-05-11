// @flow

import type { EntityID, ShortenedEntity } from '../types';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';
import { stringify } from 'querystring';

export type ItemBeverage = {|
  beverage: ShortenedEntity,
  catalogItemID: stringify,
  id: EntityID,
  isDeleted: boolean,
  organization: ShortenedEntity,
|};

export type ItemBeverageMutator = {|
  beverageID: EntityID,
  catalogItemID: stringify,
  id?: EntityID,
  organizationID: EntityID,
|};

class ItemBeverageDAO extends ODataDAO<ItemBeverage, ItemBeverageMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.ITEM_BEVERAGES,
      navigationProperties: {
        beverage: { select: ['id', 'isDeleted'] },
        organization: { select: ['id', 'isDeleted'] },
      },
      translator: new DefaultTranslator(),
    });
  }
}

export default new ItemBeverageDAO();
