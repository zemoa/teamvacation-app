import {UserModel} from "../user";
import {AppState} from "./app.state";
import {createSelector} from "@ngrx/store";

export interface UserState {
  loading: boolean;
  saving: boolean;
  users: UserModel[];
}

export const getUserState = (state: AppState) => state.userState

export const getUsers = createSelector(
  getUserState,
  (state: UserState) => state.users
)
