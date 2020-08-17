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
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavbarComponent, VacationtypeComponent, ConfirmdialogComponent],
  imports: [CommonModule, TranslateModule, FormsModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatDialogModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavbarComponent, RouterModule, VacationtypeComponent]
})
export class SharedModule {}
