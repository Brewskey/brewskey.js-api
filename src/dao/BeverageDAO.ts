import type { EntityID, QueryOptions, ShortenedEntity } from '../types';
import type { Srm } from './SrmDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import BeverageTranslator, {
  ApiBeverage,
  ApiBeverageMutator,
} from '../translators/BeverageTranslator';
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
  abv: number;
  availability: ShortenedEntity | null | undefined;
  beerVariationId: string | null | undefined;
  beverageType: BeverageType;
  createDate: Date;
  createdBy: {
    id: EntityID;
    userName: string;
  };
  description: string | null | undefined;
  externalId: string | null | undefined;
  foodPairings: string | null | undefined;
  glass: ShortenedEntity | null | undefined;
  ibu: number;
  id: EntityID;
  isDeleted: boolean;
  isOrganic: boolean;
  labels: {
    icon: string;
    large: string;
    medium: string;
  };
  name: string;
  originalGravity: number | null | undefined;
  servingTemperature: ServingTemperature | null | undefined;
  servingTemperatureDisplay: string | null | undefined;
  srm: Srm | null | undefined;
  style: ShortenedEntity | null | undefined;
  updateDate: Date;
  year: number | null | undefined;
};

export type BeverageMutator = {
  abv: number | null | undefined;
  availableId: EntityID | null | undefined;
  beverageType: BeverageType;
  description: string | null | undefined;
  glasswareId: EntityID | null | undefined;
  ibu: number | null | undefined;
  id: EntityID | null | undefined;
  isOrganic: boolean;
  name: string;
  originalGravity: number | null | undefined;
  servingTemperature: ServingTemperature | null | undefined;
  srmId: EntityID | null | undefined;
  styleId: EntityID | null | undefined;
  year: number | null | undefined;
};

class BeverageDAOImpl extends ODataDAO<
  Beverage,
  BeverageMutator,
  ApiBeverage,
  ApiBeverageMutator
> {
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

  search(queryOptions: QueryOptions): Promise<Beverage[]> {
    const funcString = 'Default.search()';

    const handler = this.__buildHandler(queryOptions, false);
    handler.func(funcString);

    return this.__fetchCustom(handler, queryOptions);
  }

  // todo move to BeverageImageDAO extends RestDAO ?
  uploadImage(beverageId: EntityID, image: string): Promise<unknown> {
    return fetch(`api/v2/beverages/${beverageId}/photo/`, {
      body: JSON.stringify({ photo: image }),
      headers: [
        { name: 'Accept', value: 'application/json' },
        { name: 'Content-Type', value: 'application/json' },
      ],
      method: 'PUT',
    });
  }
}

export const BeverageDAO = new BeverageDAOImpl();
