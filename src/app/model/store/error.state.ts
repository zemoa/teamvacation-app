import {TVError} from "../TVError";
import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";
import {AddError, RemoveLastError} from "../actions/error.actions";

export interface ErrorStateModel {
  lastError: TVError | undefined;
}

@State<ErrorStateModel>({
  name: 'errorState',
  defaults: {
      lastError: undefined
  }
})
@Injectable()
export class ErrorState {
  @Action(AddError)
  addError(ctx: StateContext<ErrorStateModel>, action: AddError) {
    return {
      lastError: <TVError>{
        func: action.errorFunc,
        type: action.errorType
      }
    };
  }

  @Action(RemoveLastError)
  removeLastError(ctx: StateContext<ErrorStateModel>) {
    return {
      lastError: undefined
    };
  }
}
