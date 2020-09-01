import {Action, createReducer, on} from "@ngrx/store";
import {LoginState} from "../store/login.store";
import {logged, loggedout, logginError, login, logout, save} from "../actions/login.actions";

export const initialState: LoginState = {
  connected: false,
  connectedUser: undefined,
  roles: [],
  token: undefined,
  connecting: false,
  error: false
};

const loginReducer = createReducer(
  initialState,
  on(login, (state, user) => {
    return {
      ...state,
      connecting: true,
      error: false
    };
  }),

  on(logged, (state, props) => {
    return {
      ...state,
      connected: true,
      connectedUser: props.user,
      token: props.token,
      connecting: false,
      error: false,
      roles: [] //TODO
    };
  }),

  on(logginError, (state) => {
    return {
      ...state,
      connecting: false,
      token: undefined,
      connectedUser: undefined,
      connected: false,
      error: true,
      roles: []
    }
  }),

  on(loggedout, (state) => initialState),

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
