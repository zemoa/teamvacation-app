import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {LoginRoutingModule} from './login/login-routing.module';
import {AuthGuard} from "./shared/helpers/auth-guard.service";
import {CalendarRoutingModule} from "./calendar/calendar-routing.module";
import {SettingsRoutingModule} from "./settings/settings-routing.module";
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {TranslateModule} from "@ngx-translate/core";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    DetailRoutingModule,
    LoginRoutingModule,
    CalendarRoutingModule,
    SettingsRoutingModule,
    AdminRoutingModule,
    TranslateModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
