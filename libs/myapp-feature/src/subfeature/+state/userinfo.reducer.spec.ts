import { userinfoReducer } from './userinfo.reducer';
import { userinfoInitialState } from './userinfo.init';
import { Userinfo } from './userinfo.interfaces';
import { DataLoaded } from './userinfo.actions';

describe('userinfoReducer', () => {
  it('should work', () => {
    const state: Userinfo = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = userinfoReducer(state, action);
    expect(actual).toEqual({});
  });
});
