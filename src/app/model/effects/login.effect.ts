import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import * as LoginAction from "../actions/login.actions"
import {catchError, map, mergeMap} from "rxjs/operators";
import {User} from "../user";
import {UserService} from "../../core/services/ws/user.service";
import {EMPTY, of} from "rxjs";

@Injectable()
export class LoginEffect {
  login$ = createEffect(() => this.actions$.pipe(
      ofType(LoginAction.login),
      mergeMap( (props) => of({id:0})),
      map(resp => (LoginAction.loadInfo({id:resp.id})))
    )
  );

  loadInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction.loadInfo),
    mergeMap( ({id}) => this.userService.getUser(id)),
    map(user => (LoginAction.infoLoaded(user)))
    )
  );

  save$ = createEffect(() => this.actions$.pipe(
    ofType(LoginAction.save),
    mergeMap((user) => this.userService.saveUser(user.id, user.firstName, user.lastName, user.email)),
    map(resp => (LoginAction.saved({id: resp.id})))
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
