import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutFullComponent } from './layouts/layout-full/layout-full.component';
import { LayoutBlankComponent } from './layouts/layout-blank/layout-blank.component';
import { HeaderComponent } from './modules/shared/header/header.component';
import { RouterModule } from '@angular/router';
import { Approutes } from './app-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './modules/shared/spinner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutFullComponent,
    LayoutBlankComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    PerfectScrollbarModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
