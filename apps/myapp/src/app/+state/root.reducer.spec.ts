import { rootReducer } from './root.reducer';
import { rootInitialState } from './root.init';
import { Root } from './root.interfaces';
import { DataLoaded } from './root.actions';

describe('rootReducer', () => {
  it('should work', () => {
    const state: Root = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = rootReducer(state, action);
    expect(actual).toEqual({});
  });
});
