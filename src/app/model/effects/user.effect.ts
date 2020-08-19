import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import * as UserAction from "../actions/user.actions"
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../../core/services/ws/user.service";

@Injectable()
export class UserEffect {
  createUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserAction.addUser),
      mergeMap( newUser => this.userService.createUser(newUser.firstname, newUser.lastname, newUser.email, newUser.secret)),
      map(user => (UserAction.addedUserSuccess(user)))
    )
  );

  saveUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.modifyUser),
    mergeMap(user => this.userService.saveUser(user.id, user.firstname, user.lastname, user.email)),
    map(user => (UserAction.modifiedUserSuccess({savedUser: user})))
  ))

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.deleteUser),
    mergeMap(deleteProps => this.userService.deleteUser(deleteProps.id)),
    map(id => (UserAction.deletedUserSuccess({id: id})))
  ))

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.loadUsers),
    mergeMap(() => this.userService.loadUsers()),
    map(users => (UserAction.loadedUsersSuccess({users : users})))
  ))

  modifySecret$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.modifySecret),
    mergeMap(modifedValues => this.userService.modifySecret(modifedValues.id, modifedValues.secret)),
    map(() => (UserAction.modifiedSecretSuccess()))
  ))
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
