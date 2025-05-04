import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { GENDER } from 'src/app/shared/helper/gender';
import { Inspector } from 'src/app/shared/helper/inspector_interface';
import { INPECTORROLES } from 'src/app/shared/helper/inspector_roles';
import { InspectorService } from 'src/app/shared/services/inspector.service';

@Component({
  selector: 'app-edit-inspector',
  templateUrl: './edit-inspector.component.html',
  styleUrls: ['./edit-inspector.component.scss'],
  providers: [DatePipe]
})
export class EditInspectorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  editInspectorGroup: FormGroup;
  StringFun: any;
  constructor(private dateConverter: DatePipe, public translate: TranslateService, public ref: DynamicDialogRef, private inspectorServices: InspectorService, public config: DynamicDialogConfig
  ) {
    this.inspector = config.data.inspector;
    this.expiryNationalID = this.dateConverter.transform(this.inspector.national_id_expiry, 'yyyy-MM-dd')!;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  inspector: Inspector | undefined;
  inspectorRole: string[] = INPECTORROLES;
  gender: string[] = GENDER;
  expiryNationalID;
  ngOnInit(): void {

    this.editInspectorGroup = new FormGroup({
      "first_name": new FormControl<string>(this.inspector.first_name,),
      "middle_name": new FormControl<string>(this.inspector.middle_name,),
      "last_name": new FormControl<string>(this.inspector.last_name,),
      "gender": new FormControl<string>(this.inspector.gender,),
      "role": new FormControl<string>(this.inspector.role,),
      "national_id_expiry": new FormControl<string>(this.expiryNationalID,),
      "national_id": new FormControl<string>(this.inspector.national_id,),
      "password": new FormControl<string>(""),
      "email": new FormControl<string>(this.inspector.email,),
      "phone_number": new FormControl<string>(this.inspector.phone_number,),

    });
  }

  onCancel() {
    this.ref.close(
      {
        "name": null
      }
    );
  }
  editInspector() {

    let createSubscription = this.inspectorServices.edit(
      {
        "first_name": this.editInspectorGroup.value.first_name == this.inspector.first_name ? null : this.editInspectorGroup.value.first_name,
        "middle_name": this.editInspectorGroup.value.middle_name == this.inspector.middle_name ? null : this.editInspectorGroup.value.middle_name,
        "last_name": this.editInspectorGroup.value.last_name == this.inspector.last_name ? null : this.editInspectorGroup.value.last_name,
        "gender": this.editInspectorGroup.value.gender == this.inspector.gender ? null : this.editInspectorGroup.value.gender,
        "role": this.editInspectorGroup.value.role == this.inspector.role ? null : this.editInspectorGroup.value.role,
        "email": this.editInspectorGroup.value.email == this.inspector.email ? null : this.editInspectorGroup.value.email,
        "password": this.editInspectorGroup.value.password.isEmpty ? null : this.editInspectorGroup.value.password,
        "national_id": this.editInspectorGroup.value.national_id == this.inspector.national_id ? null : this.editInspectorGroup.value.national_id,
        "national_id_expiry": this.editInspectorGroup.value.national_id_expiry == this.inspector.national_id_expiry ? null : this.editInspectorGroup.value.national_id_expiry,
        "phone_number": this.editInspectorGroup.value.phone_number == this.inspector.phone_number ? null : this.editInspectorGroup.value.phone_number,
        "start_date": null,
        "end_date": null
      },


      this.inspector.id,


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
