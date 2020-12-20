import {EnumErrorFunc, EnumErrorMessage} from "../TVError";

const ERROR_ACTION = '[Error Action]';

export class AddError {
  static readonly type = ERROR_ACTION + " addError";

  constructor(public errorFunc: EnumErrorFunc, public errorType: EnumErrorMessage) {}

}

export class RemoveLastError {
  static readonly type = ERROR_ACTION + " removeLastError";
}

