import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {AppConfig} from "../../../../environments/environment";
import {retryWhen, tap} from "rxjs/operators";
import {retryHttp} from "../../../shared/helpers/utils.helper";
import {Role} from "../../../model/dto";
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_URL = AppConfig.API_URL + "/auth/";
  private static TOKEN_KEY = "tv-token";
  private tokenSubject: BehaviorSubject<string>;
  private rolesSubject: BehaviorSubject<Role[]>;

  constructor(private http: HttpClient) {
    const token = window.sessionStorage.getItem(AuthService.TOKEN_KEY);
    let roles = [];
    if(token) {
      roles = jwt_decode(token).groups;
    }
    this.tokenSubject = new BehaviorSubject<string>(token);
    this.rolesSubject = new BehaviorSubject<Role[]>(roles);
  }

  login(login: string, secret: string): Observable<string> {
    return this.http.post(AuthService.AUTH_URL, {
      login: login,
      secret: secret,
      issuer: AppConfig.API_URL
    }, {responseType: 'text'}).pipe(retryWhen(retryHttp),
      tap(token => {
        window.sessionStorage.setItem(AuthService.TOKEN_KEY, token);
        this.tokenSubject.next(token)
        const decodedToken = jwt_decode(token);
        this.rolesSubject.next(decodedToken.groups);
      }, e => this.tokenSubject.next(undefined)));
  }

  get token(): string {
    return this.tokenSubject.value;
  }

  get roles(): Role[] {
    return this.rolesSubject.value;
  }

  logout(): Observable<never> {
    window.sessionStorage.clear();
    this.tokenSubject.next(undefined);
    this.rolesSubject.next([]);
    return EMPTY;
  }

  hasRole(role: Role): boolean {
    return this.roles.indexOf(role) !== -1;
  }
}
