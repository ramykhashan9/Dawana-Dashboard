import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';

@Component({
  selector: 'app-accept-reject',
  templateUrl: './accept-reject.component.html',
  styleUrls: ['./accept-reject.component.scss']
})
export class AcceptRejectComponent {
  subscription: Subscription = new Subscription();
  status: boolean;

  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private pharmaciesService: PharmaciesService,
    private dialogConfig: DynamicDialogConfig) {
    this.status = this.dialogConfig.data.status == 'approved';
  }
  // status approved - rejected
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  onCancel() {
    this.ref.close(
      {
        "name": null
      }
    );
  }
  acceptRejectPharmacy() {
    let deleteSubscription = this.pharmaciesService.acceptRejectPharmacy(this.dialogConfig.data.id, this.dialogConfig.data.status).subscribe(
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
