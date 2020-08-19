import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../model/user";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../model/store/app.state";
import {getLoggedUser} from "../../../model/store/login.store";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedUser$ : Observable<User>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loggedUser$ = this.store.pipe(
      select(getLoggedUser)
    );
  }

}
