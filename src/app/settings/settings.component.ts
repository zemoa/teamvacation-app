import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../model/store/app.state";
import {login, save} from "../model/actions/login.actions";
import {User} from "../model/user";
import {getLoggedUser} from "../model/store/login.store";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private intialUser: User;
  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
    }
  )
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(getLoggedUser)
    ).subscribe(user => {
      this.intialUser = user;
      if(user) {
        this.userForm.reset({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
      }
    });
  }

  confirm() {
    const formValue: {email: string, firstName: string, lastName: string} = this.userForm.value;
    this.store.dispatch(save({
      id: this.intialUser.id,
      email: formValue.email,
      lastName: formValue.lastName,
      firstName: formValue.firstName
    }))
  }

  cancel() {
    this.userForm.reset({
      firstName: this.intialUser.firstName,
      lastName: this.intialUser.lastName,
      email: this.intialUser.email
    });
  }

}
