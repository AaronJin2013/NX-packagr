import { Root } from './root.interfaces';
import { RootAction } from './root.actions';

export function rootReducer(state: Root, action: RootAction): Root {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
