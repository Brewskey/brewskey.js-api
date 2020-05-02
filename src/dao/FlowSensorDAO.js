// @flow

import type { EntityID } from '../types';
import type { ShortenedTap } from './TapDAO';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

export type FlowSensorType =
  | 'Custom'
  | 'FT330'
  | 'Sea'
  | 'SwissFlowSF800'
  | 'Titan';

export type FlowSensor = {|
  flowSensorType: FlowSensorType,
  id: EntityID,
  isDeleted: boolean,
  pulsesPerGallon: number,
  tap: ShortenedTap,
|};

export type FlowSensorMutator = {|
  flowSensorType: FlowSensorType,
  id?: EntityID,
  pulsesPerGallon: number,
  tapId: EntityID,
|};

class FlowSensorDAO extends ODataDAO<FlowSensor, FlowSensorMutator> {
  constructor() {
    super({
      entityName: DAO_ENTITIES.FLOW_SENSORS,
      navigationProperties: {
        tap: { select: ['id', 'isDeleted'] },
      },
      translator: new DefaultTranslator(),
    });
  }
}

export default new FlowSensorDAO();
