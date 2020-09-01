import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../model/user";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../model/store/app.state";
import {getLoggedUser, isLogged} from "../../../model/store/login.store";
import {logout} from "../../../model/actions/login.actions";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/ws/auth.service";
import {Role} from "../../../model/dto";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedUser$ : Observable<User>;
  constructor(private store: Store<AppState>, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser$ = this.store.pipe(
      select(getLoggedUser)
    );
    this.store.pipe(select(isLogged)).subscribe(logged => {
      if(!logged) {
        this.router.navigate(["/login"])
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  get isAdmin(): boolean {
    return this.authService.hasRole(Role.ROLE_ADMIN);
  }
}
