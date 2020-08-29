import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {AppConfig} from "../../../../environments/environment";
import {map, retryWhen, tap} from "rxjs/operators";
import {retryHttp} from "../../../shared/helpers/utils.helper";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static AUTH_URL = AppConfig.API_URL + "/auth/";
  private tokenSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(undefined);
  }

  login(login: string, secret: string): Observable<string> {
    return this.http.post(AuthService.AUTH_URL, {
      login: login,
      secret: secret,
      issuer: AppConfig.API_URL
    }, {responseType: 'text'}).pipe(retryWhen(retryHttp),
      tap(token => this.tokenSubject.next(token), e => this.tokenSubject.next(undefined)));
  }

  get token(): string {
    return this.tokenSubject.value;
  }
}
