import {Component, OnInit} from '@angular/core';
import {InitLogin, Login} from "../model/actions/login.actions";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";

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
  @Select(state => state.loginState.connecting) connecting$: Observable<boolean>
  @Select(state => state.loginState.error) loginError$: Observable<boolean>
  requestedUrl: string;
  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.requestedUrl = params.get('returnUrl');
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.loginState.connected)
      .subscribe(() =>
      {
        if(this.requestedUrl) {
          this.router.navigate([this.requestedUrl]);
        } else {
          this.router.navigate(["/home"]);
        }
      });
    this.store.dispatch(new InitLogin());
  }

  submitLogin(): void {
    this.store.dispatch(new Login(this.loginForm.login,this.loginForm.secret));
  }
}
