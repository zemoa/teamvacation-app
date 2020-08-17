import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {AppState} from "../../model/store/app.state";
import {select, Store} from "@ngrx/store";
import {getUsers, getUserState} from "../../model/store/user.store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {addUser, deleteUser, loadUsers, modifySecret} from "../../model/actions/user.actions";
import {MatDialog} from "@angular/material/dialog";
import {ModifysecretdialogComponent, ModifysecretdialogData} from "./modifysecretdialog/modifysecretdialog.component";
import {ConfirmdialogComponent} from "../../shared/components/confirmdialog/confirmdialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  adding = false;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'action'];
  addingForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })
  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(getUsers));
    this.store.pipe(
      select(getUserState)
    ).subscribe(userState => {
      this.adding = userState.saving;
    });
    this.store.dispatch(loadUsers());
  }

  addUser() {
    const dialogRef = this.dialog.open(ModifysecretdialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: ModifysecretdialogData) => {
      if(result.secret) {
        this.store.dispatch(addUser({
          lastname: this.addingForm.get('lastname').value,
          firstname: this.addingForm.get('firstname').value,
          email: this.addingForm.get('email').value,
          secret: result.secret
        }));
      }
    });

  }

  removeUser(id: number) {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data: {
        title: 'Confirmation',
        content: 'Really delete this user?'
      },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.store.dispatch(deleteUser({id: id}));
      }
    });
  }

  modifySecret(id: number) {
    const dialogRef = this.dialog.open(ModifysecretdialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: ModifysecretdialogData) => {
      if(result.secret) {
        this.store.dispatch(modifySecret({id: id, secret: result.secret}));
      }
    });
  }

  get canAdd(): boolean {
    return this.addingForm.valid;
  }
}
