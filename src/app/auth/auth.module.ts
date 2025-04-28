import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './error/error.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import {  HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ToastModule } from 'primeng/toast';
import { CodeInputModule } from 'angular-code-input';
import { ConfirmLoginComponent } from './confirm-login/confirm-login.component';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    ErrorComponent,
    LoginComponent,
    ConfirmLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ButtonModule,
    ToastModule,
    CodeInputModule,
    TranslateModule.forRoot(
      {
       defaultLanguage: 'ar',
       loader: {
         provide: TranslateLoader,
         useFactory: HttpLoaderFactory,
         deps: [HttpClient]
       }
      }
     )
  ]
})
export class AuthModule { }
