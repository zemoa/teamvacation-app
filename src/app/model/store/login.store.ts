import {User} from "../user";
import {AppState} from "./app.state";
import {createSelector} from "@ngrx/store";

export interface LoginState {
  connectedUser: User | undefined;
  connected: boolean;
}

export const getLoginState = (state: AppState) => state.loginState;

export const getLoggedUser = createSelector(
  getLoginState,
  (state: LoginState, props) => state.connectedUser
)
