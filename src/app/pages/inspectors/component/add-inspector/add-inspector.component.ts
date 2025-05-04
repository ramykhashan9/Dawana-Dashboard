import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { InspectorService } from 'src/app/shared/services/inspector.service';

@Component({
  selector: 'app-add-inspector',
  templateUrl: './add-inspector.component.html',
  styleUrls: ['./add-inspector.component.scss']
})
export class AddInspectorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  addInspectorGroup: FormGroup;
  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private inspectorServices: InspectorService,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.addInspectorGroup = new FormGroup({
      "name": new FormControl<string>('', [Validators.required,]),
      "password": new FormControl<string>('', [Validators.required,]),
      "email": new FormControl<string>('', [Validators.required, Validators.email]),
      // "role": new FormControl<string>('', [Validators.required,]),
    });
  }

  onCancel() {
    this.ref.close(
      {
        "name": null
      }
    );
  }
  addInspector() {

    if (this.addInspectorGroup.invalid) {
      return;
    }
    let createSubscription = this.inspectorServices.create(this.addInspectorGroup.value
    ).subscribe(
      (res) => {
        if (res && res['status']) {
          this.ref.close(res);
        }
      },
      () => {


      }
    );
    this.subscription.add(createSubscription);
  }
}
