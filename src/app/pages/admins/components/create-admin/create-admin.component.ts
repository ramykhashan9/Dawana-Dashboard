import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ADMINROLE } from 'src/app/shared/helper/admin_roles';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  addAdminGroup: FormGroup;
  StringFun: any;
  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private adminServices: AdminService,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  adminRole: string[] = ADMINROLE;
  ngOnInit(): void {
    this.addAdminGroup = new FormGroup({
      "name": new FormControl<string>('', [Validators.required, Validators.required]),
      "email": new FormControl<string>('', [Validators.required, Validators.required]),
      "password": new FormControl<string>('', [Validators.required, Validators.required]),
      "role": new FormControl<string>('', [Validators.required, Validators.required]),
    });
  }

  onCancel() {
    this.ref.close(
      {
        "name": null
      }
    );
  }
  addAdmin() {
    console.log(this.addAdminGroup.value.role);
    console.log(this.addAdminGroup.value.gender);
    if (this.addAdminGroup.invalid) {
      return;
    }
    let createSubscription = this.adminServices.create(this.addAdminGroup.value
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
