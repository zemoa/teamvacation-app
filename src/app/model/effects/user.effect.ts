import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import * as UserAction from "../actions/user.actions"
import {catchError, map, mergeMap} from "rxjs/operators";
import {User} from "../user";
import {UserService} from "../../core/services/ws/user.service";
import {EMPTY} from "rxjs";

@Injectable()
export class UserEffect {
  saveUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserAction.addUser),
      mergeMap( newUser => this.userService.saveUser(newUser.firstname, newUser.lastname, newUser.email)),
      map(user => (UserAction.addedUserSuccess(user)))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
