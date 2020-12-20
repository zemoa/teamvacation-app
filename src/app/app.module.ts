import 'reflect-metadata';
import '../polyfills';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {ServiceModule} from "./core/services/ws/ws.module";

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HomeModule} from './home/home.module';
import {DetailModule} from './detail/detail.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";


import {LoginModule} from './login/login.module';
import {CalendarModule} from './calendar/calendar.module';
import {TokenInterceptor} from "./shared/helpers/token-interceptor.service";
import {HttpErrorInterceptor} from "./shared/helpers/http-error-interceptor.service";
import {SettingsModule} from "./settings/settings.module";
import {AdminModule} from "./admin/admin.module";
import {NgxsModule} from "@ngxs/store";
import {LoginState} from "./model/store/login.state";
import {ErrorState} from "./model/store/error.state";
import {CalendarState} from "./model/store/calendar.state";
import {UserState} from "./model/store/user.state";
import {AppConfig} from "../environments/environment";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    LoginModule,
    CalendarModule,
    SettingsModule,
    AdminModule,
    NgxsModule.forRoot([LoginState, ErrorState, CalendarState, UserState], {
      developmentMode: !AppConfig.production
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
