import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ChangeMyPasswordComponent } from './components/change-my-password/change-my-password.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  ref: DynamicDialogRef | undefined;
  constructor(public translate: TranslateService, private messageService: MessageService, private dialogService: DialogService) { }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getTranslateText();
    // this.name = this.storage.getuserName().replace(/"/g, '');
    // this.type=this.storage.getAdminRole().replace(/"/g, '');

  }
  type: string = "";
  name: string = "";
  dir: string = "rtl";
  @Input() collapseSideMenu: boolean;
  @Input() collapseActivity: boolean;
  @Output() sideMenuCollapse: EventEmitter<boolean> = new EventEmitter();

  @Output() activityCollapse: EventEmitter<boolean> = new EventEmitter();
  taggleActivity() {
    this.collapseActivity = !this.collapseActivity;
    this.activityCollapse.emit(this.collapseActivity);
  }
  taggleSidMenu() {
    this.collapseSideMenu = !this.collapseSideMenu;

    this.sideMenuCollapse.emit(this.collapseSideMenu);
    console.log(this.sideMenuCollapse);
  }

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
        this.messageService.add({  key:'tl', severity: 'success', summary: 'Success', detail: response['message'] });

      } else {
        this.messageService.add({  key:'tl', severity: 'error', summary: 'Failed', detail: response['error']['message'] });

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
