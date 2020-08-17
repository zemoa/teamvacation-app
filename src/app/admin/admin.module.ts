import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { ModifysecretdialogComponent } from './users/modifysecretdialog/modifysecretdialog.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [UsersComponent, AdminHomeComponent, ModifysecretdialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class AdminModule { }
