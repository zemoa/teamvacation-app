import {Action, createReducer, on} from "@ngrx/store";
import {ErrorState} from "../store/error.store";
import {addError, removeLastError} from "../actions/error.actions";
import {TVError} from "../TVError";

export const initialState: ErrorState = {
  lastError : undefined
};

const errorReducer = createReducer(
  initialState,
  on(addError, (state, props) => {
    return {
      lastError: <TVError>{
        func: props.errorFunc,
        type: props.errorType
      }
    };
  }),

  on(removeLastError, (state, props) => {
    return {
      lastError: undefined
    };
  }),
)

export function reducer(state: ErrorState | undefined, action: Action) {
  return errorReducer(state, action);
}
