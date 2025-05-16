import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { APPROLE } from 'src/app/shared/helper/app_role';
import { MobileVersion } from 'src/app/shared/helper/mobile_version';
import { STATUS } from 'src/app/shared/helper/versions_status';
import { MobileVersionService } from 'src/app/shared/services/mobile-version.service';

@Component({
  selector: 'app-update-mobile-version',
  templateUrl: './update-mobile-version.component.html',
  styleUrls: ['./update-mobile-version.component.scss']
})
export class UpdateMobileVersionComponent implements OnInit, OnDestroy {
  status = STATUS;
  roles = APPROLE;

  subscription: Subscription = new Subscription();
  updateVersionGroup: FormGroup;
  StringFun: any;
  mobileVersion: MobileVersion;
  constructor(
    public config: DynamicDialogConfig,
    public translate: TranslateService, public ref: DynamicDialogRef,
    private mobileVersionServices: MobileVersionService,
  ) {
     this.mobileVersion = config.data.mobileVersion;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.updateVersionGroup = new FormGroup({
      AndroidVersion: new FormControl<number>(this.mobileVersion.AndroidVersion, [Validators.required]),
      IosVersion: new FormControl<number>(this.mobileVersion.IosVersion, [Validators.required]),
      role: new FormControl<string>(this.mobileVersion.role, [Validators.required]),
      AndroidStatus: new FormControl<string>(this.mobileVersion.AndroidStatus == true ? 'true' : 'false', [Validators.required]),
      IosStatus: new FormControl<string>(this.mobileVersion.IosStatus == true ? 'true' : 'false', [Validators.required]),
    });
    console.log(this.updateVersionGroup.value.role);
  }

  onCancel() {
    this.ref.close(
      undefined
    );
  }
  updateVersion() {
    if (this.updateVersionGroup.invalid) {
      return;
    }
    let createSubscription = this.mobileVersionServices.updateMobileVersion({
      "versionId": this.mobileVersion.id,
      "AndroidVersion": this.updateVersionGroup.value.AndroidVersion,
      "IosVersion": this.updateVersionGroup.value.IosVersion,
      "role": this.updateVersionGroup.value.role,
      "AndroidStatus": this.updateVersionGroup.value.AndroidStatus == 'true' ? true : false,
      "IosStatus": this.updateVersionGroup.value.IosStatus == "true" ? true : false,
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