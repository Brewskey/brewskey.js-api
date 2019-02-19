// @flow

import type { EntityID, QueryOptions, ShortenedEntity } from '../types';
import type { Srm } from './SrmDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator from '../translators/BeverageTranslator';
import fetch from '../fetch';

export type BeverageType = 'Beer' | 'Cider' | 'Coffee' | 'Soda';

export type ServingTemperature =
  | 'cellar'
  | 'cold'
  | 'cool'
  | 'hot'
  | 'very_cold'
  | 'warm';

export type Beverage = {
  abv: number,
  availability: ?ShortenedEntity,
  beerVariationId: ?string,
  beverageType: BeverageType,
  createDate: Date,
  createdBy: {
    id: EntityID,
    userName: string,
  },
  description: ?string,
  externalId: ?string,
  foodPairings: ?string,
  glass: ?ShortenedEntity,
  ibu: number,
  id: EntityID,
  isDeleted: boolean,
  isOrganic: boolean,
  labels: {
    icon: string,
    large: string,
    medium: string,
  },
  name: string,
  originalGravity: ?number,
  servingTemperature: ?ServingTemperature,
  servingTemperatureDisplay: ?string,
  srm: ?Srm,
  style: ?ShortenedEntity,
  updateDate: Date,
  year: ?number,
};

export type BeverageMutator = {
  abv: ?number,
  availableId: ?EntityID,
  beverageType: BeverageType,
  description: ?string,
  glasswareId: ?EntityID,
  ibu: ?number,
  id: ?EntityID,
  isOrganic: boolean,
  name: string,
  originalGravity: ?number,
  servingTemperature: ?ServingTemperature,
  srmId: ?EntityID,
  styleId: ?EntityID,
  year: ?number,
};

class BeverageDAO extends ODataDAO<Beverage, BeverageMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.BEVERAGES,
      navigationProperties: {
        availability: { select: ['id', 'name'] },
        createdBy: { select: ['id', 'userName'] },
        glass: { select: ['id', 'name'] },
        srm: { select: ['hex', 'id', 'name'] },
        style: { select: ['id', 'name'] },
      },
      translator: new BeverageTranslator(),
    });
  }

  search(queryOptions: QueryOptions): LoadObject<Array<LoadObject<Beverage>>> {
    const funcString = `Default.search()`;

    const handler = this.__buildHandler(queryOptions, false);
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions, funcString);
  }

  // todo move to BeverageImageDAO extends RestDAO ?
  uploadImage(beverageId: EntityID, image: string): Promise<*> {
    return fetch(`beverages/${beverageId}/photo/`, {
      body: JSON.stringify({ photo: image }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'PUT',
    });
  }
}

export default new BeverageDAO();
