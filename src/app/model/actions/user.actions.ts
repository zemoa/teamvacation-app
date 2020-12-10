import {createAction, props} from "@ngrx/store";
import {RoleDto, User, UserExt, UserModel} from "../user";
import {EnumValideur} from "../dto";

const USER_ACTION = '[User Action]';
export const KEY_ADD = USER_ACTION + ' Add';
export const KEY_ADD_SUCCESS = USER_ACTION + ' Added Success';

export const addUser = createAction(
  KEY_ADD,
  props<{firstname: string, lastname: string, email: string, secret: string}>()
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
  props<{ savedUser: User | UserExt }>()
)

export const loadUsers = createAction(
  USER_ACTION + ' Load'
)
export const loadedUsersSuccess = createAction(
  USER_ACTION + ' Loaded Success',
  props<{users: UserExt[]}>()
)

export const modifySecret = createAction(
  USER_ACTION + ' Secret',
  props<{id: number, secret: string}>()
)
export const modifiedSecretSuccess = createAction(
  USER_ACTION + ' Modified secret Success'
)

export const modifyValideur = createAction(
  USER_ACTION + " Modify valideur",
  props<{idUser: number, valideurType: EnumValideur}>()
)

export const valideurModifed = createAction(
  USER_ACTION + " Valideur modified",
  props<{idUser: number, valideurType: EnumValideur}>()
)

export const modifyAdmin = createAction(
  USER_ACTION + " Modify admin",
  props<{idUser: number, isAdmin: boolean}>()
)

export const adminModified = createAction(
  USER_ACTION + " Admin modified",
  props<{idUser: number, isAdmin: boolean}>()
)
