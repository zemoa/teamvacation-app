import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveUser(firstname: string, lastname: string, email: string): Observable<User> {
    return of(<User>{
      id: -2,
      firstName: firstname,
      lastName: lastname,
      email: email
    });
  }
}
