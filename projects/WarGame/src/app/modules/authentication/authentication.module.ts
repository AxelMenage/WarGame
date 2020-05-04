import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
//import { ReinitMDPComponent } from './reinit-mdp/reinit-mdp.component';
//import { FormReinitMDPComponent } from './reinit-mdp/components';

import { AuthenticationRoutes } from './authentication.routing';
import { AdminLibModule } from 'admin-lib';
import { JwtInterceptor, ErrorInterceptor } from '../../core/helpers/interceptors';
import { ForgotPassComponent } from './login/components/forgot-pass/forgot-pass.component';
import { ConnectComponent } from './login/components/connect/connect.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLibModule
  ],
  declarations: [
    LoginComponent,
    //ReinitMDPComponent,
    //FormReinitMDPComponent,
    ForgotPassComponent,
    ConnectComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
]
})
export class AuthenticationModule {}
