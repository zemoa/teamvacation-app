import {Observable, of, throwError} from "rxjs";
import {delay, scan, switchMap, takeWhile} from "rxjs/operators";
import {TypedAction} from "@ngrx/store/src/models";
import * as ErrorAction from "../../model/actions/error.actions";
import {EnumErrorFunc, EnumErrorMessage} from "../../model/TVError";

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
    return `${date.getFullYear()+date.getMonth()+date.getDate()}`
  } else {
    return "";
  }
}

export function manageWsErrors<T>(errorFunc: EnumErrorFunc, err: any): Observable<TypedAction<any>> {
  return of(ErrorAction.addError({
    errorType: EnumErrorMessage.UNKNOWN,
    errorFunc: errorFunc
  }));
}

export class Constants {
  readonly DATE_FORMAT_WS = "yyyyMMdd";
}
