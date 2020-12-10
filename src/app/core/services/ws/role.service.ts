import {Injectable} from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {RoleDto} from "../../../model/user";
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../../../environments/environment";
import {mergeMap, retryWhen} from "rxjs/operators";
import {retryHttp} from "../../../shared/helpers/utils.helper";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private static ROLE_URL = AppConfig.API_URL + "/roles";
  constructor(private http: HttpClient) { }

  getAll():Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(`${RoleService.ROLE_URL}`)
      .pipe(retryWhen(retryHttp), mergeMap(_ => EMPTY));
  }
}
