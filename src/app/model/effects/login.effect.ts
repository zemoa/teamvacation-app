import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import * as LoginAction from "../actions/login.actions"
import {catchError, map, mergeMap, repeat, tap} from "rxjs/operators";
import {UserService} from "../../core/services/ws/user.service";
import {EMPTY, of, zip} from "rxjs";
import {AuthService} from "../../core/services/ws/auth.service";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => this.actions$.pipe(
      ofType(LoginAction.login),
      mergeMap( (props) => this.authService.login(props.login, props.secret)),
      mergeMap(token => zip(
          this.userService.getLogged(),
          of({
            id: 0,
            roles: [],
            token: token
          })
        )),
      map(zipresult => (LoginAction.logged({
          token: zipresult[1].token,
          user: zipresult[0]
        }))
      ),
    catchError(() => of(LoginAction.logginError())),
    repeat()
   )
  );

  initLogin$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction.initLogin),
    mergeMap(_ => this.authService.token? of(this.authService.token): EMPTY),
    mergeMap(token => zip(
      this.userService.getLogged(),
      of({
        id: 0,
        roles: [],
        token: token
      })
    )),
    map(zipresult => (LoginAction.logged({
        token: zipresult[1].token,
        user: zipresult[0]
      }))
    ),
    catchError(() => of(LoginAction.logout())),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction.logout),
    tap(_ => this.authService.logout()),
    map(_ => (LoginAction.loggedout()))
  ));

  save$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction.save),
    mergeMap((user) => this.userService.saveUser(user.id, user.firstName, user.lastName, user.email)),
    map(resp => (LoginAction.saved({id: resp.id})))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService
  ) {}
}
