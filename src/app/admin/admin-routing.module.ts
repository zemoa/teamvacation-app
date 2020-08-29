import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AuthGuard} from "../shared/helpers/auth-guard.service";


const routes: Routes = [{
  path: 'admin',
  component: AdminHomeComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {


}
