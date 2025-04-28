import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ActivityComponent } from './components/activity/activity.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChangeMyPasswordComponent } from './components/nav-bar/components/change-my-password/change-my-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [
    SideMenuComponent,
    NavBarComponent,
    ActivityComponent,
    ChangeMyPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
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
  ], exports: [
    SideMenuComponent,
    ActivityComponent,
    NavBarComponent,
    TranslateModule
  ],
  providers: [DialogService, MessageService]
})
export class SharedModule { }
