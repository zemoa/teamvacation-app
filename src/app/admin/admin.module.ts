import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {SharedModule} from "../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [UsersComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class AdminModule { }
