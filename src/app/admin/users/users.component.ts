import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {RoleDto, User, UserModel} from "../../model/user";
import {AppState} from "../../model/store/app.state";
import {select, Store} from "@ngrx/store";
import {getUsers, getUserState} from "../../model/store/user.store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  addUser,
  deleteUser,
  loadUsers,
  modifyAdmin,
  modifySecret,
  modifyValideur
} from "../../model/actions/user.actions";
import {MatDialog} from "@angular/material/dialog";
import {ModifysecretdialogComponent, ModifysecretdialogData} from "./modifysecretdialog/modifysecretdialog.component";
import {ConfirmdialogComponent} from "../../shared/components/confirmdialog/confirmdialog.component";
import {EnumValideur} from "../../model/dto";
import {map} from "rxjs/operators";

interface UserDto {
  id: number | undefined;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: FormControl;
  valideurState: FormControl;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<UserDto[]>;
  adding = false;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'admin', 'valideur', 'action'];
  enumValideur = EnumValideur;
  addingForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })
  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(getUsers),
      map(users => {
        return users.map(user => {
          const valideurForm = new FormControl(user.valideurState, {
            updateOn: "blur"
          });
          valideurForm.valueChanges.subscribe(value => this.onChangeValideur(user.id, value));
          const adminForm = new FormControl(user.roleList ? user.roleList.some(role => role.id === 0): false, {
            updateOn: "change"
          });
          adminForm.valueChanges.subscribe(value => this.onAdminChange(user.id, value));
          return {
            email: user.email,
            firstName: user.firstName,
            id: user.id,
            lastName: user.lastName,
            isAdmin: adminForm,
            valideurState: valideurForm
          } as UserDto
        })
      })
      );
    this.store.pipe(
      select(getUserState)
    ).subscribe(userState => {
      this.adding = userState.saving;
    });
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
        this.addingForm.reset();
        this.addingForm.clearValidators();
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

  isAdmin(user: UserModel): boolean {
    return user.roleList && user.roleList.some(role => role.id === 0);
  }
  onAdminChange(userId: number, isAdmin: boolean) {
    // console.log(`admin : ${userId} - ${isAdmin}`);
    this.store.dispatch(modifyAdmin({idUser: userId, isAdmin: isAdmin}));
}
  onChangeValideur(userId: number, value: EnumValideur){
    // console.log(`valideur : ${userId} - ${value}`);
    this.store.dispatch(modifyValideur({idUser: userId, valideurType: value}));
  }
  get canAdd(): boolean {
    return this.addingForm.valid;
  }
}
