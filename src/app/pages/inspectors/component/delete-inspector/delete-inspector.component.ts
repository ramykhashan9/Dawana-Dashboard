import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { InspectorService } from 'src/app/shared/services/inspector.service';
 
@Component({
  selector: 'app-delete-inspector',
  templateUrl: './delete-inspector.component.html',
  styleUrls: ['./delete-inspector.component.scss'],
  providers: [MessageService]

})
export class DeleteInspectorComponent implements OnDestroy {
  subscription: Subscription = new Subscription();


  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private inspectorServices:InspectorService,
     private dialogConfig: DynamicDialogConfig) { }
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
  deleteAdmin() {
    let deleteSubscription = this.inspectorServices.delete(this.dialogConfig.data.inspector_id).subscribe(
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
