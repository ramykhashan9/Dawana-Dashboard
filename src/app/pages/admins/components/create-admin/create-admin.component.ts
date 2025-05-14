import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { NATIONALADMINROLES, REGIONALADMINROLES, SUPERADMINROLES } from 'src/app/shared/helper/admin_roles';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Storage } from 'src/app/shared/config';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';
import { Governorate } from 'src/app/shared/helper/governorate';
import { PharmacySearch } from 'src/app/shared/helper/pharmacy_search';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  addAdminGroup: FormGroup;
  StringFun: any;
  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private adminServices: AdminService, private storage: Storage
    , private governorateService: GovernorateService,
    private pharmacyService: PharmaciesService
  ) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  adminRole: string[] = [];
  showHint: boolean = true;
  selectedRole: string = '';
  ngOnInit(): void {
    this.setAdminRole();
    this.getAllGovernorates();
    this.addAdminGroup = new FormGroup({
      "name": new FormControl<string>('', [Validators.required,]),
      "email": new FormControl<string>('', [Validators.required,]),
      "password": new FormControl<string>('', [Validators.required,]),
      "role": new FormControl<string>('', [Validators.required,]),
      "selectedPharmacies": this.selectedRole == 'sub admin'
        ? new FormControl<PharmacySearch[]>([], Validators.required)
        : new FormControl<PharmacySearch[]>([],),
      "selectedGovernorates": this.selectedRole == 'regional admin'
        ? new FormControl<Governorate[]>([], Validators.required)
        : new FormControl<Governorate[]>([],),
    });

    this.addAdminGroup.get("role")?.valueChanges.subscribe((value: string) => {
      console.log("shoow");
      this.selectedRole = value;
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

  showGovern: boolean = false;
  showPharma: boolean = false;
  onRoleChange() {
    const selectedRole = this.addAdminGroup.get('role')?.value;
    if (selectedRole == 'regional admin') {
      this.showGovern = true;
      this.showPharma = false;
    } else if (selectedRole == 'sub admin') {
      this.showPharma = true;
      this.showGovern = false;
    } else {
      this.showGovern = false;
      this.showPharma = false;
    }
  }
  governorates: Governorate[] = [];
  selectedGovernorates: Governorate[] = [];
  getAllGovernorates() {
    let governSub$ = this.governorateService.getAllGovernorate().subscribe(
      (res) => {
        if (res['status']) {
          this.governorates = res['data'];
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.subscription.add(governSub$);
  }
  pharmacies: PharmacySearch[] = [];
  selectedPharmacies: PharmacySearch[] = [];
  getPharmacyByName(event: AutoCompleteCompleteEvent) {
    let name = event.query;
    this.showHint = name.length >= 0 && name.length < 3;

    if (name.trim().length > 2) {
      let pharmaSub$ = this.pharmacyService.pharmacySearchByName(name).subscribe(
        (res) => {
          if (res['status']) {
            this.pharmacies = res['data'];
          }
        },
        (error) => {
          console.log(error);
        }
      );

      this.subscription.add(pharmaSub$);
    }
  }
  onCancel() {
    this.ref.close(
     undefined
    );
  }
  addAdmin() {
    let governs: Governorate[] = []
    let pharmas: PharmacySearch[] = []
    //  console.log(this.addAdminGroup.value.role);
    // console.log(this.addAdminGroup.value.gender);
    if (this.addAdminGroup.invalid) {
      return;
    }
    for (let i = 0; i < this.addAdminGroup.value.selectedPharmacies.length; i++) {
      pharmas.push(this.addAdminGroup.value.selectedPharmacies[i].id);
    }
    for (let i = 0; i < this.addAdminGroup.value.selectedGovernorates.length; i++) {
      governs.push(this.addAdminGroup.value.selectedGovernorates[i].id);
    }
    let createSubscription = this.adminServices.create(
      {
        "name": this.addAdminGroup.value.name,
        "password": this.addAdminGroup.value.password,
        "email": this.addAdminGroup.value.email,
        "role": this.addAdminGroup.value.role,
        "gov_ids": this.addAdminGroup.value.selectedGovernorates.length == 0 ? [] : governs,
        "pharmacy_ids": this.addAdminGroup.value.selectedPharmacies.length == 0 ? [] : pharmas
      }
    ).subscribe(
      (res) => {
        if (res && res['status']) {
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
