import {createAction, props} from "@ngrx/store";
import {EnumErrorFunc, EnumErrorMessage} from "../TVError";

const ERROR_ACTION = '[Error Action]';

export const addError = createAction(
  ERROR_ACTION + " addError",
  props<{errorFunc: EnumErrorFunc, errorType: EnumErrorMessage}>()
)


export const removeLastError = createAction(
  ERROR_ACTION + " removeLastError",
)

