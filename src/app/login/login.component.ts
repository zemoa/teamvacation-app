import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../model/store/app.state";
import * as LoginAction from "../model/actions/login.actions";
import {Observable} from "rxjs";
import {isConnecting, isLogged, isLoggingError} from "../model/store/login.store";
import {Router} from "@angular/router";

interface LoginForm {
  login: string;
  secret: string;
}
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm = {
    login: '',
    secret: ''
  }
  connecting$: Observable<boolean>
  loginError$: Observable<boolean>
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.connecting$ = this.store.pipe(select(isConnecting));
    this.loginError$ = this.store.pipe(select(isLoggingError));
    this.store.pipe(select(isLogged))
      .subscribe(value => this.router.navigate(["/home"]));
  }

  submitLogin(): void {
    this.store.dispatch(LoginAction.login({
      login: this.loginForm.login,
      secret: this.loginForm.secret
    }))
  }
}
