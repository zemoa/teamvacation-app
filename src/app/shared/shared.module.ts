import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, NavbarComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from "@angular/material/button";
import { RouterModule } from '@angular/router';
import { VacationtypeComponent } from './components/vacationtype/vacationtype.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavbarComponent, VacationtypeComponent],
  imports: [CommonModule, TranslateModule, FormsModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavbarComponent, RouterModule, VacationtypeComponent]
})
export class SharedModule {}
