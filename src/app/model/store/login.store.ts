import {User} from "../user";
import {AppState} from "./app.state";
import {createSelector} from "@ngrx/store";
import {Role} from "../dto";

export interface LoginState {
  connectedUser: User | undefined | null;
  token: string | undefined | null;
  connected: boolean;
  roles: Role[];
  connecting: boolean;
  error: boolean;
}

export const getLoginState = (state: AppState) => state.loginState;

export const getLoggedUser = createSelector(
  getLoginState,
  (state: LoginState, props) => state.connectedUser
)

export const isLogged= createSelector(
  getLoginState,
  (state: LoginState, props) => state.connected
)

export const getRoles= createSelector(
  getLoginState,
  (state: LoginState, props) => state.roles
)

export const getToken= createSelector(
  getLoginState,
  (state: LoginState, props) => state.token
)

export const isConnecting= createSelector(
  getLoginState,
  (state: LoginState, props) => state.connecting
)

export const isLoggingError= createSelector(
  getLoginState,
  (state: LoginState, props) => state.error
)
