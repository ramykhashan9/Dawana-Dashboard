import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ADMINROLE } from 'src/app/shared/helper/admin_roles';
import { Admins } from 'src/app/shared/helper/admins';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  editAdminGroup: FormGroup;
  StringFun: any;
  admin: Admins | undefined;
  constructor(public config: DynamicDialogConfig, public translate: TranslateService, public ref: DynamicDialogRef, private adminService: AdminService,
  ) {
    this.admin = config.data.admin;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inspectorRole: string[] = ADMINROLE;
  ngOnInit(): void {
    this.editAdminGroup = new FormGroup({


      "name": new FormControl<string>(this.admin.name),
      "email": new FormControl<string>(this.admin.email),
      "password": new FormControl<string>(""),
      "role": new FormControl<string>(this.admin.role),
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
    console.log(this.editAdminGroup.value.role);
    console.log(this.editAdminGroup.value.gender);
    if (this.editAdminGroup.invalid) {
      return;
    }
    let createSubscription = this.adminService.update(this.admin.id, {
      "role": this.editAdminGroup.value.role == this.admin.role ? null : this.editAdminGroup.value.role,
      "name": this.editAdminGroup.value.name == this.admin.name ? null : this.editAdminGroup.value.name,
      "email": this.editAdminGroup.value.email == this.admin.email ? null : this.editAdminGroup.value.email,
      "password": this.editAdminGroup.value.password=="" ? null : this.editAdminGroup.value.password,

    }
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
