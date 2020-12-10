import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import * as UserAction from "../actions/user.actions"
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {UserService} from "../../core/services/ws/user.service";
import {manageWsErrors} from "../../shared/helpers/utils.helper";
import {EnumErrorFunc} from "../TVError";

@Injectable()
export class UserEffect {
  createUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserAction.addUser),
      mergeMap( newUser => this.userService.createUser(newUser.firstname, newUser.lastname, newUser.email, newUser.secret)),
      map(user => (UserAction.addedUserSuccess(user))),
      catchError(err => manageWsErrors(EnumErrorFunc.CREATE_USER, err))
    )
  );

  saveUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.modifyUser),
    mergeMap(user => this.userService.saveUser(user.id, user.firstname, user.lastname, user.email)),
    map(user => (UserAction.modifiedUserSuccess({savedUser: user}))),
    catchError(err => manageWsErrors(EnumErrorFunc.SAVE_USER, err))
  ))

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.deleteUser),
    mergeMap(deleteProps => this.userService.deleteUser(deleteProps.id)),
    map(id => (UserAction.deletedUserSuccess({id: id}))),
    catchError(err => manageWsErrors(EnumErrorFunc.DELETE_USER, err))
  ))

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.loadUsers),
    mergeMap(() => this.userService.loadUsersAdmin()),
    map(users => (UserAction.loadedUsersSuccess({users : users}))),
    catchError(err => manageWsErrors(EnumErrorFunc.LOAD_USER, err))
  ))

  modifySecret$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.modifySecret),
    mergeMap(modifedValues => this.userService.modifySecret(modifedValues.id, modifedValues.secret)),
    map(() => (UserAction.modifiedSecretSuccess())),
    catchError(err => manageWsErrors(EnumErrorFunc.MODIFY_SECRET, err))
  ))

  modifyAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.modifyAdmin),
    mergeMap(modifyAdmin => this.userService.changeAdmin(modifyAdmin.idUser, modifyAdmin.isAdmin)),
    map(user => (UserAction.modifiedUserSuccess({savedUser: user}))),
    catchError(err => manageWsErrors(EnumErrorFunc.MODIFIY_ADMIN, err))
  ))

  modifyValideur$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.modifyValideur),
    mergeMap(modifyValideur => this.userService.changeValideur(modifyValideur.idUser, modifyValideur.valideurType)),
    map(user => (UserAction.modifiedUserSuccess({savedUser: user}))),
    catchError(err => manageWsErrors(EnumErrorFunc.MODIFY_VALIDEUR, err))
  ))
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
