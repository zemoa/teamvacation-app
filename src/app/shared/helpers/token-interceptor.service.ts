import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../model/store/app.state";
import {AppConfig} from "../../../environments/environment";
import {getToken} from "../../model/store/login.store";
import {AuthService} from "../../core/services/ws/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.startsWith(AppConfig.API_URL);
    const token = this.authService.token;
    if(token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
