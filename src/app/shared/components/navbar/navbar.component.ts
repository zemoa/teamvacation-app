import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../model/user";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/ws/auth.service";
import {Role} from "../../../model/dto";
import {Select, Store} from "@ngxs/store";
import {Logout} from "../../../model/actions/login.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Select(state => state.loginState.connectedUser) loggedUser$ : Observable<User>;
  constructor(private store: Store, private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.store.select(state => state.loginState.connected).subscribe(logged => {
      if(!logged) {
        this.router.navigate(["/login"])
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(new Logout());
  }

  get isAdmin(): boolean {
    return this.authService.hasRole(Role.ROLE_ADMIN);
  }
}
