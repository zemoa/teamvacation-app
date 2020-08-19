import {createAction, props} from "@ngrx/store";
import {User} from "../user";
const LOGIN_ACTION = '[Login Action]';

export const login = createAction(
  LOGIN_ACTION + " login",
  props<{login: string, secret: string}>()
)

export const loadInfo = createAction(
  LOGIN_ACTION + " load info",
  props<{id: number}>()
)

export const infoLoaded= createAction(
  LOGIN_ACTION + " Info loaded",
  props<User>()
)

export const save= createAction(
  LOGIN_ACTION + " Save",
  props<User>()
)

export const saved= createAction(
  LOGIN_ACTION + " Saved",
  props<{id: number}>()
)
