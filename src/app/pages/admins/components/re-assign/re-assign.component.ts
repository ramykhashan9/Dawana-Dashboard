import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { GovernorateService } from 'src/app/shared/services/governorate.service';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';
import { PharmacySearch } from 'src/app/shared/helper/pharmacy_search';
import { Governorate } from 'src/app/shared/helper/governorate';
import { Admins } from 'src/app/shared/helper/admins';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-re-assign',
  templateUrl: './re-assign.component.html',
  styleUrls: ['./re-assign.component.scss']
})
export class ReAssignComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  reAssignGroup: FormGroup;
  StringFun: any;
  admin: Admins | undefined;

  constructor(public config: DynamicDialogConfig, public translate: TranslateService, public ref: DynamicDialogRef, private adminServices: AdminService,
    private governorateService: GovernorateService,
    private pharmacyService: PharmaciesService
  ) {
    this.admin = config.data.admin;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  adminRole: string[] = [];
  showHint: boolean = true;
  selectedRole: string = '';
  showGovern: boolean = false;
  showPharma: boolean = false;
  ngOnInit(): void {
    this.selectedRole = this.admin.role;
    if (this.selectedRole == 'regional admin') {
      this.getAllGovernorates();
      this.showGovern = true;
      this.showPharma = false;
    }
    if (this.selectedRole == 'sub admin') {
      this.showGovern = false;
      this.showPharma = true;
    }
    this.reAssignGroup = new FormGroup(
      {
        "selectedPharmacies": this.selectedRole == 'sub admin'
          ? new FormControl<PharmacySearch[]>(this.admin.assignPharmacies, Validators.required)
          : new FormControl<PharmacySearch[]>([],),
        "selectedGovernorates": this.selectedRole == 'regional admin'
          ? new FormControl<Governorate[]>(this.admin.governorates, Validators.required)
          : new FormControl<Governorate[]>([],),

      },
    );


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
  reAssign() {
    let governs: Governorate[] = []
    let pharmas: PharmacySearch[] = []
    if (this.reAssignGroup.invalid) {
      return;
    }
    for (let i = 0; i < this.reAssignGroup.value.selectedPharmacies.length; i++) {
      pharmas.push(this.reAssignGroup.value.selectedPharmacies[i].id);
    }
    for (let i = 0; i < this.reAssignGroup.value.selectedGovernorates.length; i++) {
      governs.push(this.reAssignGroup.value.selectedGovernorates[i].id);
    }
    let rassignSubscription = this.adminServices.reAssign(
      {
        "governorateIds": this.reAssignGroup.value.selectedGovernorates.length == 0 ? [] : governs,
        "pharmacyIds": this.reAssignGroup.value.selectedPharmacies.length == 0 ? [] : pharmas,
        "adminId": this.admin.id,
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
    this.subscription.add(rassignSubscription);
  }
}
