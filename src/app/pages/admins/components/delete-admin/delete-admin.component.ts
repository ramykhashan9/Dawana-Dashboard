import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.scss'],
  providers: [MessageService]

})
export class DeleteAdminComponent implements OnDestroy {
  subscription: Subscription = new Subscription();


  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private adminServices: AdminService,
    private dialogConfig: DynamicDialogConfig) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.ref.close(
      undefined
    );
  }
  deleteAdmin() {
    let deleteSubscription = this.adminServices.delete(this.dialogConfig.data.admin_id).subscribe(
      (res) => {
        if (res && res['status']) {
          this.ref.close(res);
        }
      },
      (error) => {
        this.ref.close(error);

      }
    );

    this.subscription.add(deleteSubscription);
  }

}
