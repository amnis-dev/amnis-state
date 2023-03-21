import { uid } from '../../../core/index.js';
import { entitySliceCreate } from '../entity.slice.js';
import type { Audit, AuditBase, AuditCreator } from './audit.types.js';

const auditKey = 'audit';

export const auditBase = (): AuditBase => ({
  action: 'Unspecified',
  completed: false,
});

export function auditCreator(
  audit: AuditCreator,
): Audit {
  return {
    ...auditBase(),
    ...audit,
    $id: uid(auditKey),
  };
}

export const auditState = entitySliceCreate({
  key: auditKey,
  creator: auditCreator,
});
