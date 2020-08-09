import {User} from "../user";
import {AppState} from "./app.state";
import {createSelector} from "@ngrx/store";

export interface UserState {
  loading: boolean;
  adding: boolean;
  users: User[];
}

export const getUserState = (state: AppState) => state.userState

export const getUsers = createSelector(
  getUserState,
  (state: UserState) => state.users
)
