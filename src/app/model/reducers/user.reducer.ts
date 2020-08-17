import {UserState} from "../store/user.store";
import * as UserAction from "../actions/user.actions";
import {Action, createReducer, on} from "@ngrx/store";
import * as _ from "lodash";

export const initialState: UserState = {
  loading: false,
  saving: false,
  users: [
  ],
};

const userReducer = createReducer(
  initialState,
  on(UserAction.addUser, (state, {email, firstname, lastname, secret}) => {
    return {
      ...state,
      saving: true
    }
    return state;
  }),
  on(UserAction.addedUserSuccess, (state, user) => {
    return {
      ...state,
      saving: false,
      users: [...state.users, user]
    }
    return state;
  }),

  on(UserAction.deleteUser, (state, {id}) => {
    return {
      ...state,
      saving: true
    }
  }),
  on(UserAction.deletedUserSuccess, (state, {id}) => {
    let newUsers = [...state.users];
    _.remove(newUsers, value => value.id === id);
    return {
      ...state,
      users: newUsers,
      saving: false
    }
  }),

  on(UserAction.loadUsers, (state) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(UserAction.loadedUsersSuccess, (state, {users}) => {
    return {
      ...state,
      users: users
    }
  }),

  on(UserAction.modifyUser, (state, {id, email, firstname, lastname}) => {
    return {
      ...state,
      saving: true
    };
  }),
  on(UserAction.modifiedUserSuccess, (state, {savedUser}) => {
    const modifiedIndex = state.users.findIndex(user => user.id === savedUser.id);
    return {
      ...state,
      saving: false,
      users: [state.users.slice(0, modifiedIndex), savedUser, state.users.slice(modifiedIndex+1, state.users.length)]
    }
  }),
  on(UserAction.modifySecret, state => {
    return {
      ...state,
      saving: true
    }
  }),
  on(UserAction.modifiedSecretSuccess, state => {
    return {
      ...state,
      saving: false
    }
  })
)

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
