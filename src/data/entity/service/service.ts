import { dateJSON, uid } from '../../../core/index.js';
import type { Service, ServiceBase, ServiceCreator } from './service.types.js';

export const serviceKey = 'service';

export const serviceBase: ServiceBase = {
  name: 'Unknown Service',
  status: 'offline',
  dateChecked: dateJSON(),
};

export function serviceCreator(
  service: ServiceCreator,
): Service {
  return {
    ...serviceBase,
    dateChecked: dateJSON(),
    ...service,
    $id: uid(serviceKey),
  };
}
