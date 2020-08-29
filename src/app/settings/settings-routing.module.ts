import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings.component";
import {AuthGuard} from "../shared/helpers/auth-guard.service";


const routes: Routes = [{
  path: 'settings',
  component: SettingsComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {


}
