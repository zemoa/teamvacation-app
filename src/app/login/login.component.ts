import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../model/store/app.state";
import * as LoginAction from "../model/actions/login.actions";
import {Observable} from "rxjs";
import {isConnecting, isLogged, isLoggingError} from "../model/store/login.store";
import {ActivatedRoute, Router} from "@angular/router";
import * as ErrorAction from "../model/actions/error.actions";
import {EnumErrorFunc, EnumErrorMessage} from "../model/TVError";

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
  requestedUrl: string;
  constructor(private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.requestedUrl = params.get('returnUrl');
    })
  }

  ngOnInit(): void {
    this.connecting$ = this.store.pipe(select(isConnecting));
    this.loginError$ = this.store.pipe(select(isLoggingError));
    this.store.pipe(select(isLogged))
      .subscribe(_ =>
      {
        if(this.requestedUrl) {
          this.router.navigate([this.requestedUrl]);
        } else {
          this.router.navigate(["/home"]);
        }
      });
    this.store.dispatch(LoginAction.initLogin());
  }

  submitLogin(): void {
    this.store.dispatch(LoginAction.login({
      login: this.loginForm.login,
      secret: this.loginForm.secret
    }));
  }
}
