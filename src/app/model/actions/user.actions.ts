import {createAction, props} from "@ngrx/store";
const USER_ACTION = '[User Action]';
export const addUser = createAction(
  USER_ACTION + ' Add',
  props<{firstname: string, lastname: string, email: string}>()
)

export const addedUserSuccess = createAction(
  USER_ACTION + ' Added Success'
)

export const deleteUser = createAction(
  USER_ACTION + ' Delete',
  props<{id: number}>()
)

export const deletedUserSuccess = createAction(
  USER_ACTION + ' Deleted Success'
)

export const modifyUser = createAction(
  USER_ACTION + ' Modify',
  props<{id: number, firstname: string, lastname: string, email: string}>()
)

export const modifiedUserSuccess = createAction(
  USER_ACTION + ' Modified Success'
)

export const loadUsers = createAction(
  USER_ACTION + ' Load'
)
export const loadedUsersSuccess = createAction(
  USER_ACTION + ' Loaded Success'
)
