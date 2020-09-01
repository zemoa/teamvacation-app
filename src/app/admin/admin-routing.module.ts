import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AuthGuard} from "../shared/helpers/auth-guard.service";
import {Role} from "../model/dto";


const routes: Routes = [{
  path: 'admin',
  component: AdminHomeComponent,
  canActivate: [AuthGuard],
  data: {role : Role.ROLE_ADMIN}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {


}
