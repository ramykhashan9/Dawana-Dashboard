import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Admins } from 'src/app/shared/helper/admins';
import { AdminService } from 'src/app/shared/services/admin.service';
import { DeleteAdminComponent } from './components/delete-admin/delete-admin.component';
import { UpdateAdminComponent } from './components/update-admin/update-admin.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;
  subscriptions: Subscription = new Subscription();
  addAdminText: string;
  editAdminText: string;
  deleteAdminText: string;
  constructor(private route: ActivatedRoute, private dialogService: DialogService,
    private adminServices: AdminService,
    public translate: TranslateService,
    private messageService: MessageService
  ) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this._getAdmins();
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  headers: string[] = [
    "ID",
    "NAME",
    "EMAIL",
    "ROLE",
    "CREATEDDATE",
    "CREATEDBY",
    "ISACTIVE",
    "LASTLOGIN",
  ]

  admins: Admins[] = [];

  _getAdmins() {
    try {
      const response = this.route.snapshot.data['admins'];
      if (response && response.status) {
        this.admins = response.data;
      }
    } catch (e) { }
  }
  getAlAdmins() {
    let getIAdminsSubscriptions = this.adminServices.getAllAdmins().subscribe(
      (res) => {
        this.admins = res['data'];
      }, () => {

      });
    this.subscriptions.add(getIAdminsSubscriptions);
  }

  createAdmin() {
    this.ref = this.dialogService.open(CreateAdminComponent, {
      header: this.addAdminText,
      width: '700px',
      height: "400px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });
    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAlAdmins();
        this.messageService.add({  key:'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({  key:'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
      // this.messageService.add({ severity: 'info', summary: 'Filter', detail: "" });
      // this._getAllDepartment();
      // location.reload();
    });

  }
  editAdmin(admin: Admins) {
    this.ref = this.dialogService.open(UpdateAdminComponent, {
      data: {
        'admin': admin
      },
      header: this.editAdminText,
      width: '700px',
      height: "400px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAlAdmins();
        this.messageService.add({  key:'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({  key:'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
  deleteAdmin(adminID) {
    this.ref = this.dialogService.open(DeleteAdminComponent, {
      data: {
        'admin_id': adminID
      },
      header: this.deleteAdminText,
      width: '700px',
      height: "230px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAlAdmins();
        this.messageService.add({  key:'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({  key:'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
}
