import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
