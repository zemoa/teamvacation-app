import {Observable, of, throwError} from "rxjs";
import {delay, scan, switchMap, takeWhile} from "rxjs/operators";

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
