import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from "../../core/services/ws/auth.service";
import {Store} from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLoggedSubject: BehaviorSubject<boolean>;
  constructor(private router: Router, private store: Store, private authService: AuthService) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(false);
    this.store.select(state => state.loginState.connected).subscribe(value => this.isLoggedSubject.next(value));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedSubject.value) {
      if(next.data.role && !this.authService.hasRole(next.data.role)) {
        this.router.navigate(["/"]);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
