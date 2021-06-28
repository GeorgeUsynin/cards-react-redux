import {registerInitialState} from "./registerInitialState";
import {IRegisterActions, REGISTER} from "./registerActions";

export const registerReducer = (state = registerInitialState, action: IRegisterActions) => {
  switch (action.type) {
    case REGISTER: { // blank
      return {
        ...state,
        isRegistered: action.isRegistered
      }
    }
    
    default: {
      return state;
    }
  }
};
