import {Action, createReducer, on} from "@ngrx/store";
import {LoginState} from "../store/login.store";
import {infoLoaded, save} from "../actions/login.actions";

export const initialState: LoginState = {
  connected: false,
  connectedUser: undefined,
};

const loginReducer = createReducer(
  initialState,
  on(infoLoaded, (state, user) => {
    return {
      ...state,
      connected: true,
      connectedUser: user
    };
  }),

  on(save, (state, user) => {
    return {
      ...state,
      connectedUser: user
    }
  })
)

export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
