import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { NATIONALADMINROLES, REGIONALADMINROLES, SUPERADMINROLES } from 'src/app/shared/helper/admin_roles';
import { Admins } from 'src/app/shared/helper/admins';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Storage } from 'src/app/shared/config';

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
  constructor(public config: DynamicDialogConfig, public translate: TranslateService, public ref: DynamicDialogRef, private adminService: AdminService, private storage: Storage
  ) {
    this.admin = config.data.admin;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  adminRole: string[] = [];
  ngOnInit(): void {
    this.setAdminRole();
    this.editAdminGroup = new FormGroup({
      "name": new FormControl<string>(this.admin.name),
      "email": new FormControl<string>(this.admin.email),
      "password": new FormControl<string>(""),
      "role": new FormControl<string>(this.admin.role),
    });
  }
  setAdminRole() {
    let role = this.storage.getRole().replace(/"/g, '');
    switch (role) {
      case 'super admin':
        this.adminRole = SUPERADMINROLES;
        break;
      case 'national admin':
        this.adminRole = NATIONALADMINROLES;
        break;
      case 'regional admin':
        this.adminRole = REGIONALADMINROLES;
        break;
      case 'sub admin':
        this.adminRole = [];
    }

  }
  onCancel() {
    this.ref.close(
     undefined
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
      "password": this.editAdminGroup.value.password == "" ? null : this.editAdminGroup.value.password,

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
