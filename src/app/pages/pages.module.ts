
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { NgxEditorModule } from 'ngx-editor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from '../shared/shared.module';
import { PharmaciesComponent } from './pharmacies/pharmacies.component';
import { SettingsComponent } from './settings/settings.component';
import { InspectorsComponent } from './inspectors/inspectors.component';
import { AddInspectorComponent } from './inspectors/component/add-inspector/add-inspector.component';
import { DeleteInspectorComponent } from './inspectors/component/delete-inspector/delete-inspector.component';
import { EditInspectorComponent } from './inspectors/component/edit-inspector/edit-inspector.component';
import { AcceptRejectComponent } from './pharmacies/component/accept-reject/accept-reject.component';
import { DetailsComponent } from './pharmacies/component/details/details.component';
import { AssignToComponent } from './pharmacies/component/assign-to/assign-to.component';
import { UploadDispensingComponent } from './pharmacies/component/upload-dispensing/upload-dispensing.component';
import { AdminsComponent } from './admins/admins.component';
import { CreateAdminComponent } from './admins/components/create-admin/create-admin.component';
import { DeleteAdminComponent } from './admins/components/delete-admin/delete-admin.component';
import { UpdateAdminComponent } from './admins/components/update-admin/update-admin.component';
import { MobileVersionsComponent } from './settings/components/mobile-versions/mobile-versions.component';
import { AddMobileVersionComponent } from './settings/components/mobile-versions/components/add-mobile-version/add-mobile-version.component';
import { UpdateMobileVersionComponent } from './settings/components/mobile-versions/components/update-mobile-version/update-mobile-version.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [

    InspectorsComponent,
    PharmaciesComponent,
    SettingsComponent,
    AddInspectorComponent,
    DeleteInspectorComponent,
    EditInspectorComponent,
    AcceptRejectComponent,
    DetailsComponent,
    AssignToComponent,
    UploadDispensingComponent,
    AdminsComponent,
    CreateAdminComponent,
    DeleteAdminComponent,
    UpdateAdminComponent,
    MobileVersionsComponent,
    AddMobileVersionComponent,
    UpdateMobileVersionComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    PagesRoutingModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    EditorModule,
    CardModule,
    CalendarModule,
    DynamicDialogModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    MultiSelectModule,
    CarouselModule,
    GalleriaModule,
    ImageModule,
    ToastModule,
    PaginatorModule,
    FileUploadModule,
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
    , NgxEditorModule

  ],

  exports: [

  ],

  providers: [DialogService, MessageService, NgxImageCompressService]
})
export class PagesModule { }