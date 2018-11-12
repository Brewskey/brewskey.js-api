// @flow
import type { FlowSensor, FlowSensorMutator } from '../index';

import ODataDAO from './ODataDAO';
import { DAO_ENTITIES } from '../constants';
import DefaultTranslator from '../translators/DefaultTranslator';

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
