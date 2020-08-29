import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../model/store/app.state";
import {isLogged} from "../../model/store/login.store";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLoggedSubject: BehaviorSubject<boolean>;
  constructor(private router: Router, private store: Store<AppState>) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(false);
    this.store.pipe(select(isLogged)).subscribe(value => this.isLoggedSubject.next(value));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedSubject.value) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }

}
