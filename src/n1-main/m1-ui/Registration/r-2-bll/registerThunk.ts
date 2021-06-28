import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { IRegisterActions, registerSome } from './b-2-redux/registerActions'
import { IAppStore } from '../../../m2-bll/store'
import { RegisterAPI } from '../r-3-dal/registerAPI'
// import {passwordCoding} from "../../../f-2-helpers/h-1-authorization/passwordCoding";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const register =
  (email: string, password: string): ThunkAction<Return, IAppStore, ExtraArgument, IRegisterActions> =>
    async (dispatch: ThunkDispatch<IAppStore, ExtraArgument, IRegisterActions>, getStore: IGetStore) => {
      debugger
      try {
        debugger
        let res = await RegisterAPI.register(email, password)
        debugger
        console.log(res)
        dispatch(registerSome(true))
      } catch (e) {
        debugger
        const error = e.error.response.data.error
        console.log(error)
      }
    }
