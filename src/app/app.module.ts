import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { NgxEditorModule } from 'ngx-editor';
import { ErrorInterceptor, OutInterceptor } from './shared/interceptors';
import { Config } from './shared/config';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { Storage } from './shared/config';
import { ToastModule } from 'primeng/toast';
import { CodeInputModule } from 'angular-code-input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmLoginGuardService } from './shared/guards/confirm-login-guard.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    FullLayoutComponent,
  ],
  imports: [
    NgxEditorModule,
    NgxSpinnerModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    DropdownModule,
    EditorModule,
    NgxPaginationModule,
    NgbModule,
    TableModule,
    CardModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    AutoCompleteModule,
    DialogModule,
    PanelMenuModule,
    SidebarModule,
    ToastModule,
    RippleModule,
    DynamicDialogModule,
    CodeInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,

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
  ],
  providers: [
    Config,
   // AuthService,
    AuthGuardService,
    ConfirmLoginGuardService,
    Storage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OutInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
