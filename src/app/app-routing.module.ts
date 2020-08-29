import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { CalendarModule } from './calendar/calendar.module';
import {AdminModule} from "./admin/admin.module";
import {SettingsModule} from "./settings/settings.module";
import {AuthGuard} from "./shared/helpers/auth-guard.service";
import {CalendarRoutingModule} from "./calendar/calendar-routing.module";
import {SettingsRoutingModule} from "./settings/settings-routing.module";
import {AdminRoutingModule} from "./admin/admin-routing.module";

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
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DetailRoutingModule,
    LoginRoutingModule,
    CalendarRoutingModule,
    SettingsRoutingModule,
    AdminRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
