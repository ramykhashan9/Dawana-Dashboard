import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Pharmacies } from 'src/app/shared/helper/pharmacies';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';
import { AcceptRejectComponent } from './component/accept-reject/accept-reject.component';
import { DetailsComponent } from './component/details/details.component';
import { AssignToComponent } from './component/assign-to/assign-to.component';
import { UploadDispensingComponent } from './component/upload-dispensing/upload-dispensing.component';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.scss'],
  providers: [MessageService]

})
export class PharmaciesComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private dialogService: DialogService,
    private pharmaciesService: PharmaciesService,
    public translate: TranslateService,
    private messageService: MessageService
  ) { }
  headers: string[] = [
    "ID",
    "PHARMACYNAME",
    "SIGNNAME",
    "STATUS",
    "PHARMACYTYPE",
    "GOVERNORATE",
    "CREATEDDATE",
    "CREATEDBY",

  ]
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this._getPharmacies();
  }
  ref: DynamicDialogRef | undefined;
  subscriptions: Subscription = new Subscription();

  pharmacies: Pharmacies[] = [];

  _getPharmacies() {
    try {
      const response = this.route.snapshot.data['pharmacies'];
      if (response && response.status) {
        this.pharmacies = response.data['pharmacies'];
        this.totalRecords = response.data['count'];
      }
    } catch (e) { }
  }
  getAllPharmacies(skip:number=0,take:number=10) {
    let getPpharmaciesSubscriptions = this.pharmaciesService.getAllPharmacies({},skip,take).subscribe(
      (res) => {
        this.pharmacies = res['data']['pharmacies'];
        this.totalRecords = res['data']['count'];
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

  pharmacyDetails(pharmacy) {
    this.ref = this.dialogService.open(DetailsComponent, {
      data: {
        'pharmacy': pharmacy,
      },
      header: "",
      width: '900px',
      height: "700px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });
  }
  acceptRejectedPharmacy(pharmacyID, status: string) {
    this.ref = this.dialogService.open(AcceptRejectComponent, {
      data: {
        'id': pharmacyID,
        'status': status
      },
      header: "",
      width: '700px',
      height: "230px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAllPharmacies();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
  assignToInspector(pharmacyId) {
    this.ref = this.dialogService.open(AssignToComponent, {
      data: {
        "pharmacyId": pharmacyId
      },
      header: "",
      width: '700px',
      height: "300px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAllPharmacies();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
  getStatusCalss(status: string) {
    switch (status) {
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'rejected';
      case 'pending':
        return 'pending';
      case 'suspended':
        return 'suspended';
      default:
        return "";
    }
  }
  uploadDipensingLetter(pharmacyId) {
    this.ref = this.dialogService.open(UploadDispensingComponent, {
      data: {
        "pharmacyId": pharmacyId
      },
      header: "",
      width: '700px',
      height: "300px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response == undefined) {
        return;
      }
      if (response && response.status == true) {
        this.getAllPharmacies();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
  currentPage: number = 0;
  totalRecords: number = 0;
  pageSize: number = 10;
  onPageChange(event: any) {
    this.pageSize = event.rows;
    this.currentPage = event.page;
    console.log(this.pageSize);
    console.log(this.currentPage);
    this.getAllPharmacies(this.pageSize * this.currentPage, this.pageSize);
  }
}
