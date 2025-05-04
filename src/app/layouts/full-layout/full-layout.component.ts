import { Component, computed, inject, OnDestroy, OnInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ChangeMyPasswordComponent } from 'src/app/shared/components/nav-bar/components/change-my-password/change-my-password.component';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
 @Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
  providers: [MessageService]
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  ref: DynamicDialogRef | undefined;
  type: string = "";
  name: string = "";
  departmentName: string = "";

  constructor(public translate: TranslateService, private messageService: MessageService, private dialogService: DialogService,  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.getTranslateText();
    // this.name = this.storage.getuserName().replace(/"/g, '');
    // this.type=this.storage.getAdminRole().replace(/"/g, '');
    // this.departmentName = this.storage.getuserDepartmentName().replace(/"/g, ''); 
  }
  dir: string = 'rtl';
  screenWidth: number = 0;
  collapsed = false;
  onToggleSideNav(data: boolean) {
    this.collapsed = data;

  }
  collappeSideMenu = false;
  collappeActivivty = false;

  getCollapsedSideMenu(event: boolean): void {
    console.log("fulll : " + this.collappeSideMenu);

    this.collappeSideMenu = event;
    console.log("fulll : " + this.collappeSideMenu);
  }
  getCollapsedActivity(event: boolean): void {
    this.collappeActivivty = event;
    console.log(this.collappeActivivty);

  }

  sideBarOpened = false;
  activitiesOpened = false;

  responsiveService = inject(ResponsiveService);

  sideBarMode = computed(() => {
    if (this.responsiveService.smallWidth()) {
      this.sideBarOpened = false;
      return 'over';
    }
    this.sideBarOpened = true;
    return 'side';
  });
  activitiesMode = computed(() => {
    if (this.responsiveService.largeWidth()) {
      this.activitiesOpened = true;
      return 'side';
    }
    this.activitiesOpened = false;
    return 'over';
  });


  head: string;
  changePassword() {
    this.ref = this.dialogService.open(ChangeMyPasswordComponent, {
      header: this.head,
      width: '70%',
      height: "70%",
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      style: { direction: this.dir }

    });

    this.ref.onClose.subscribe((response) => {
      if (response == undefined) {
        return;
      }
      if (response.status === true) {
        this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({ key: 'tr', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

      }

    });
  }

  getTranslateText() {
    let headSub$ = this.translate.get('ChangePassword').subscribe(
      (res) => {
        this.head = res;
      }
    );

    this.subscriptions.add(headSub$);
  }

}
