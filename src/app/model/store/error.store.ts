import {AppState} from "./app.state";
import {TVError} from "../TVError";
import {createSelector} from "@ngrx/store";

export interface ErrorState {
  lastError: TVError | undefined;
}

export const getErrorState = (state: AppState) => state.errorState;

export const getLastError = createSelector(
  getErrorState,
  (state: ErrorState) => state.lastError
)
