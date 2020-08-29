import {createAction, props} from "@ngrx/store";
import {User} from "../user";
const LOGIN_ACTION = '[Login Action]';

export const login = createAction(
  LOGIN_ACTION + " login",
  props<{login: string, secret: string}>()
)

export const logged = createAction(
  LOGIN_ACTION + " logged",
  props<{
    token: string,
    user: User
  }>()
)

export const logginError = createAction(
  LOGIN_ACTION + " error"
)

export const save= createAction(
  LOGIN_ACTION + " Save",
  props<User>()
)

export const saved= createAction(
  LOGIN_ACTION + " Saved",
  props<{id: number}>()
)
