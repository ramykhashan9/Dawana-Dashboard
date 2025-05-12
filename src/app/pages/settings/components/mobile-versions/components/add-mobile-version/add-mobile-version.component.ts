import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { STATUS } from 'src/app/shared/helper/versions_status';
import { MobileVersionService } from 'src/app/shared/services/mobile-version.service';

@Component({
  selector: 'app-add-mobile-version',
  templateUrl: './add-mobile-version.component.html',
  styleUrls: ['./add-mobile-version.component.scss']
})
export class AddMobileVersionComponent implements OnInit, OnDestroy {
  status = STATUS;
  subscription: Subscription = new Subscription();
  addVersionGroup: FormGroup;
  StringFun: any;
  constructor(public translate: TranslateService, public ref: DynamicDialogRef,
    private mobileVersionServices: MobileVersionService,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.addVersionGroup = new FormGroup({
      AndroidVersion: new FormControl<number>(null, [Validators.required]),
      IosVersion: new FormControl<number>(null, [Validators.required]),
      AndroidStatus: new FormControl<string>(null, [Validators.required]),
      IosStatus: new FormControl<string>(null, [Validators.required]),
    });
  }

  onCancel() {
    this.ref.close(
      undefined
    );
  }
  addVersion() {
    if (this.addVersionGroup.invalid) {
      return;
    }
    let createSubscription = this.mobileVersionServices.addMobileVersion({
      "AndroidVersion": this.addVersionGroup.value.AndroidVersion,
      "IosVersion": this.addVersionGroup.value.IosVersion,
      "AndroidStatus": this.addVersionGroup.value.AndroidStatus == 'true' ? true : false,
      "IosStatus": this.addVersionGroup.value.IosStatus == "true" ? true : false,
    }
    ).subscribe(
      (res) => {
        if (res['status']) {
          this.ref.close(res);
        }
      },
      (error) => {
        this.ref.close(error);
      }
    );
    this.subscription.add(createSubscription);
  }

}
