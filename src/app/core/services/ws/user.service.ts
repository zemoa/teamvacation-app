import { Injectable } from '@angular/core';
import {EMPTY, Observable, of, throwError} from "rxjs";
import {User} from "../../../model/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig} from "../../../../environments/environment";
import {delay, map, mergeMap, retry, retryWhen} from "rxjs/operators";
import {retryHttp} from "../../../shared/helpers/utils.helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static USER_URL = AppConfig.API_URL + "/users/";
  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(UserService.USER_URL + id)
      .pipe(retryWhen(retryHttp));
  }

  getLogged():Observable<User> {
    return this.http.get<User>(UserService.USER_URL + "logged")
      .pipe(retryWhen(retryHttp));
  }

  getRoles(id: number):Observable<string[]> {
    return this.http.get<string[]>(UserService.USER_URL + id + "/roles")
      .pipe(retryWhen(retryHttp));
  }
  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(UserService.USER_URL)
      .pipe(retryWhen(retryHttp));
  }

  createUser(firstname: string, lastname: string, email: string, secret: string): Observable<User> {
    return this.http.post<User>(UserService.USER_URL, {
      email: email,
      firstName: firstname,
      lastName:lastname,
      secret: secret
    }).pipe(retryWhen(retryHttp));
  }
  saveUser(id: number, firstname: string, lastname: string, email: string): Observable<User> {
    return this.http.put<User>(UserService.USER_URL + id, {
      id: id,
      email: email,
      firstName: firstname,
      lastName: lastname
    }).pipe(retryWhen(retryHttp));
  }

  deleteUser(id:number): Observable<number> {
    return this.http.delete(`${UserService.USER_URL}${id}`).pipe(
      retryWhen(retryHttp),
      mergeMap(_ => of(id))
    );
  }

  changeAdmin(id:number, isAdmin: boolean): Observable<never> {
    const httpParams = new HttpParams().set("isAdmin", String(isAdmin));
    return this.http.put(UserService.USER_URL + id + "/admin", { params: httpParams })
      .pipe(retryWhen(retryHttp), mergeMap(_ => EMPTY));
  }
  modifySecret(id: number, secret: string):Observable<never> {
    return this.http.put(UserService.USER_URL + id + "/secret", {
      secret: secret
    }).pipe(retryWhen(retryHttp), mergeMap(_ => EMPTY));
  }
}
