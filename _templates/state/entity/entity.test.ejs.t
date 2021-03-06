---
to: "<%= path ? `${path}/${name}/${name}.test.ts` : null %>"
---
import {
  <%= name %>InitialState,
  <%= name %>Selectors,
  <%= name %>Actions,
} from './<%= name %>';
import { <%= name %>Default } from './<%= name %>.default';

import { <%= name %>StoreSetup } from './<%= name %>.store';

/**
 * ============================================================
 */
test('<%= name %> should return the initial state', () => {
  const store = <%= name %>StoreSetup();

  expect(
    store.getState().<%= name %>,
  ).toEqual(<%= name %>InitialState);
});

/**
 * ============================================================
 */
test('should handle creating a new <%= name %>', () => {
  const store = <%= name %>StoreSetup();

  const action = <%= name %>Actions.create({ ...<%= name %>Default });

  store.dispatch(action);
  const entities = <%= name %>Selectors.selectAll(store.getState());
  expect(entities).toHaveLength(1);

  expect(entities[0]).toEqual(expect.objectContaining({
    myProperty: expect.any(String),
  }));
});
