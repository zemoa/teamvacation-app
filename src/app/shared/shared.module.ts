import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, NavbarComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavbarComponent],
  imports: [CommonModule, TranslateModule, FormsModule, MatToolbarModule, MatIconModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavbarComponent, RouterModule]
})
export class SharedModule {}
