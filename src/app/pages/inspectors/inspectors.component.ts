import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { InspectorService } from 'src/app/shared/services/inspector.service';
import { AddInspectorComponent } from './component/add-inspector/add-inspector.component';
import { DeleteInspectorComponent } from './component/delete-inspector/delete-inspector.component';
import { Inspector } from 'src/app/shared/helper/inspector_interface';
import { EditInspectorComponent } from './component/edit-inspector/edit-inspector.component';
import { StringFun } from 'src/app/shared/helper/camil_case_method';

@Component({
  selector: 'app-inspectors',
  templateUrl: './inspectors.component.html',
  styleUrls: ['./inspectors.component.scss'],
  providers: [MessageService]

})
export class InspectorsComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;
  subscriptions: Subscription = new Subscription();
  addInspectorText: string;
  editInspectorText: string;
  deleteInspectorText: string;
  constructor(private route: ActivatedRoute, private dialogService: DialogService,
    private inspectorServices: InspectorService,
    public translate: TranslateService, private messageService: MessageService) { }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this._getInspector();
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
    "LASTLOGIN",
    "ROLE",
    "GENDER",
    "NATIONALID",
    "NATIONALIDEXPIRY",
    "CREATEDDATE",
    "CREATEDBY",
    "VERIFY",


  ]

  inspectors: Inspector[] = [];

  _getInspector() {
    try {
      const response = this.route.snapshot.data['inspectors'];
      if (response && response.status) {
        this.inspectors = response.data['inspectors'];
        this.totalRecords = response.data['count'];
      }
    } catch (e) { }
  }
  getAllInspectors(skip: number = 0, take: number = 10) {
    let getInspectorsSubscriptions = this.inspectorServices.getAllInspectors(skip, take).subscribe(
      (res) => {
        this.inspectors = res['data']['inspectors'];
        this.totalRecords = res['data']['count'];
      }, (error) => {
        console.log(error);
      });
    this.subscriptions.add(getInspectorsSubscriptions);
  }
  createInspector() {
    this.ref = this.dialogService.open(AddInspectorComponent, {
      header: this.addInspectorText,
      width: '700px',
      height: "600px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });
    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAllInspectors();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
      // this.messageService.add({ severity: 'info', summary: 'Filter', detail: "" });
      // this._getAllDepartment();
      // location.reload();
    });

  }
  editInspector(inspector: Inspector) {
    this.ref = this.dialogService.open(EditInspectorComponent, {
      data: {
        'inspector': inspector
      },
      header: this.addInspectorText,
      width: '700px',
      height: "600px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAllInspectors();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
  deleteInspector(inspectorID) {
    this.ref = this.dialogService.open(DeleteInspectorComponent, {
      data: {
        'inspector_id': inspectorID
      },
      header: this.addInspectorText,
      width: '700px',
      height: "230px",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: 'rtl', padding: '10px', background: 'white' }
    });

    this.ref.onClose.subscribe((response) => {
      if (response && response.status == true) {
        this.getAllInspectors();
        this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }
    });
  }
  camilCase(val) {
    return StringFun.camilCaseMethod(val);
  }
  currentPage: number = 0;
  totalRecords: number = 0;
  pageSize: number = 5;
  onPageChange(event: any) {
    this.pageSize = event.rows;
    this.currentPage = event.page;
    console.log(this.pageSize);
    console.log(this.currentPage);
    this.getAllInspectors(this.pageSize * this.currentPage, this.pageSize);
  }
}

