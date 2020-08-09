import {User} from "../user";
import {AppState} from "./app.state";

export interface UserState {
  loading: boolean;
  adding: boolean;
  users: User[];
}

export const getUserState = (state: AppState) => state.userState
