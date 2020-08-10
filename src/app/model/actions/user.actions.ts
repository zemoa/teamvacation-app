import {createAction, props} from "@ngrx/store";
import {User} from "../user";
const USER_ACTION = '[User Action]';
export const KEY_ADD = USER_ACTION + ' Add';
export const KEY_ADD_SUCCESS = USER_ACTION + ' Added Success';

export const addUser = createAction(
  KEY_ADD,
  props<{firstname: string, lastname: string, email: string}>()
)

export const addedUserSuccess = createAction(
  KEY_ADD_SUCCESS,
  props<User>()
)

export const deleteUser = createAction(
  USER_ACTION + ' Delete',
  props<{id: number}>()
)

export const deletedUserSuccess = createAction(
  USER_ACTION + ' Deleted Success',
  props<{id: number}>()
)

export const modifyUser = createAction(
  USER_ACTION + ' Modify',
  props<{id: number, firstname: string, lastname: string, email: string}>()
)

export const modifiedUserSuccess = createAction(
  USER_ACTION + ' Modified Success',
  props<{ savedUser: User }>()
)

export const loadUsers = createAction(
  USER_ACTION + ' Load'
)
export const loadedUsersSuccess = createAction(
  USER_ACTION + ' Loaded Success',
  props<{users: User[]}>()
)

export const modifySecret = createAction(
  USER_ACTION + ' Secret',
  props<{id: number, secret: string}>()
)
export const modifiedSecretSuccess = createAction(
  USER_ACTION + ' Modified sexret Success'
)
