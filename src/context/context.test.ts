import { contextSetup } from './context.js';
import { roleState } from '../data/entity/role/index.js';
import { systemState } from '../data/entity/system/index.js';

test('should create initial node context', async () => {
  const context = await contextSetup({ initialize: true });

  const systems = systemState.selectors().selectAll(context.store.getState());
  const roles = roleState.selectors().selectAll(context.store.getState());

  expect(systems).toHaveLength(1);
  expect(roles).toHaveLength(4);

  const [system] = systems;

  expect(system).toEqual(expect.objectContaining({
    name: 'Core System',
  }));
  expect(true).toBe(true);
});
