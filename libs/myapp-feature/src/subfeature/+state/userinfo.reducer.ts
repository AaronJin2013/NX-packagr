import { Userinfo } from './userinfo.interfaces';
import { UserinfoAction } from './userinfo.actions';

export function userinfoReducer(state: Userinfo, action: UserinfoAction): Userinfo {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
