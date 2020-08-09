import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {AppState} from "../../model/store/app.state";
import {select, Store} from "@ngrx/store";
import {getUserState} from "../../model/store/user.store";
import {map} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {addUser} from "../../model/actions/user.actions";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  adding = false;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'action'];
  addingForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(getUserState)
    ).subscribe(userState => {
      this.users = userState.users;
      this.adding = userState.adding;
    });
  }

  addUser(): void {
    this.store.dispatch(addUser({
      lastname: this.addingForm.get('lastname').value,
      firstname: this.addingForm.get('firstname').value,
      email: this.addingForm.get('email').value
    }));
  }
  get canAdd(): boolean {
    return this.addingForm.valid;
  }
}
