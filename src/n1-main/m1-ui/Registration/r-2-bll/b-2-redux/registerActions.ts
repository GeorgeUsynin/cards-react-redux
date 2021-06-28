export const REGISTER_LOADING = 'REGISTER/LOADING';
export const REGISTER_ERROR = 'REGISTER/ERROR';
export const REGISTER_SUCCESS = 'REGISTER/SUCCESS';

export const REGISTER = 'REGISTER/SOME';

interface IRegisterSome { // blank
  type: typeof REGISTER;
  isRegistered: boolean
}

export type IRegisterActions = IRegisterSome;

export const registerSome = (isRegistered: boolean): IRegisterSome => ({ // blank
  type: REGISTER,
  isRegistered
} as const);
