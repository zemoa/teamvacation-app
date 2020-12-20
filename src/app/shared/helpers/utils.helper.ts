import {Observable, of, throwError} from "rxjs";
import {delay, scan, switchMap, takeWhile} from "rxjs/operators";
import {AddError} from "../../model/actions/error.actions";
import {EnumErrorFunc, EnumErrorMessage} from "../../model/TVError";
import * as moment from "moment";
import {StateContext} from "@ngxs/store";

export function retryHttp(errors: Observable<any>): Observable<any> {
  return errors.pipe(
    switchMap((error) => {
      if(error.status === 504 || error.status === 503 || error.status === 408) {
        return of(error.status)
      }
      return throwError(error);
    }),
    scan(acc => acc + 1, 0),
    takeWhile(value => value < 2),
    delay(1000)
  );
}

export function formatDateForWs(date: Date): string {
  if(date) {
    return moment(date).format(Constants.DATE_FORMAT_WS);
  } else {
    return "";
  }
}
export function manageWsErrors(errorFunc: EnumErrorFunc, err: any, ctx: StateContext<any>){
  ctx.dispatch(new AddError(errorFunc, EnumErrorMessage.UNKNOWN));
}

export class Constants {
  static readonly DATE_FORMAT_WS = "YYYYMMDD";
}
