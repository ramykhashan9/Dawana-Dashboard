import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { MobileVersion } from 'src/app/shared/helper/mobile_version';
import { MobileVersionService } from 'src/app/shared/services/mobile-version.service';
import { AddMobileVersionComponent } from './components/add-mobile-version/add-mobile-version.component';
import { UpdateMobileVersionComponent } from './components/update-mobile-version/update-mobile-version.component';

@Component({
  selector: 'app-mobile-versions',
  templateUrl: './mobile-versions.component.html',
  styleUrls: ['./mobile-versions.component.scss']
})
export class MobileVersionsComponent {
  addMobileVersionText: string;
  editMobileVesionText: string;
  constructor(private route: ActivatedRoute,
    private dialogService: DialogService,
    private mobileVersionService: MobileVersionService,
    public translate: TranslateService,
    private messageService: MessageService
  ) { }
  headers: string[] = [
    "ID",
    "ANDROIDVERSION",
    "IOSVERSION",
    "ANDROIDSTATUS",
    "IOSSTATUS",
    "CREATEDDATE",
    "CREATEDBY",
    "LASTCHANGEDDATE",
    "LASTCHANGEDBY"

  ]
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this._getMobileVersions();
  }
  ref: DynamicDialogRef | undefined;
  subscriptions: Subscription = new Subscription();

  mobileversions: MobileVersion[] = [];

  _getMobileVersions() {
    const response = this.route.snapshot.data['mobileVersions'];
    if (response && response.status) {
      console.log(response);
      this.mobileversions = response.data;
    }
  }
  getAllMobileVersions() {
    let getPpharmaciesSubscriptions = this.mobileVersionService.getAllMobileVersions().subscribe(
      (res) => {
        console.log(res);
        this.mobileversions = res['data'];
      }, (error) => {
        console.log(error);
      });
    this.subscriptions.add(getPpharmaciesSubscriptions);
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
  createMobileVersion() {
    this.ref = this.dialogService.open(AddMobileVersionComponent, {
      header: this.addMobileVersionText,
      width: '700px',
      height: "400px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });
    this.ref.onClose.subscribe((response) => {
      if (response == undefined) {
        return;
      }
      if (response.status == true) {
        this.messageService.add({  key:'tl', severity: 'success', summary: 'Success', detail: response['message'] });
        this.getAllMobileVersions();

      } else {
        this.messageService.add({  key:'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
      // this.messageService.add({ severity: 'info', summary: 'Filter', detail: "" });
      // this._getAllDepartment();
      // location.reload();
    });

  }
  editMobileVersion(mobileVersion: MobileVersion) {
    this.ref = this.dialogService.open(UpdateMobileVersionComponent, {
      data: {
        'mobileVersion': mobileVersion
      },
      header: this.editMobileVesionText,
      width: '700px',
      height: "400px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response == undefined) {
        return;
      }
      if (response.status == true) {
        this.getAllMobileVersions();
        this.messageService.add({  key:'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({  key:'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }

}
