import {UserState} from "../store/user.store";
import * as UserAction from "../actions/user.actions";
import {Action, createReducer, on} from "@ngrx/store";

export const initialState: UserState = {
  loading: false,
  adding: false,
  users: [
    {id:0, email:"toto@email.com", firstName: "toto Prénom", lastName: "toto Nom"},
    {id:1, email:"titi@email.com", firstName: "titi Prénom", lastName: "Titi Nom"}
  ],
};

const userReducer = createReducer(
  initialState,
  on(UserAction.addUser, (state, {email, firstname, lastname}) => {
    return {
      ...state,
      adding: true
    }
    return state;
  }),
  on(UserAction.addedUserSuccess, (state, user) => {
    return {
      ...state,
      adding: false,
      users: [...state.users, user]
    }
    return state;
  }),

  on(UserAction.deleteUser, (state, {id}) => {
    return state;
  }),

  on(UserAction.loadUsers, (state) => {
    return state;
  }),

  on(UserAction.modifyUser, (state, {id, email, firstname, lastname}) => {
    return state;
  }),
)

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
