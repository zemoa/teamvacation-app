import { Injectable } from '@angular/core';
import {EMPTY, Observable, of} from "rxjs";
import {User} from "../../../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  loadUsers(): Observable<User[]> {
    return of(
      [
        {id: 0, email: "toto@email.com", firstName: "toto Prénom", lastName: "toto Nom"},
        {id: 1, email: "titi@email.com", firstName: "titi Prénom", lastName: "Titi Nom"}
      ]
    );
  }

  saveUser(firstname: string, lastname: string, email: string): Observable<User> {
    return of(<User>{
      id: -2,
      firstName: firstname,
      lastName: lastname,
      email: email
    });
  }

  modifySecret(id: number, secret: string):Observable<never> {
    return EMPTY;
  }

  deleteUser(id:number): Observable<number> {
    return of(id);
  }

  createUser(firstname: string, lastname: string, email: string, secret: string): Observable<User> {
    return of(<User>{
      id: -2,
      firstName: firstname,
      lastName: lastname,
      email: email
    })
  }
}
