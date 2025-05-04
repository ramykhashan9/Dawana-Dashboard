import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { GENDER } from 'src/app/shared/helper/gender';
import { INPECTORROLES } from 'src/app/shared/helper/inspector_roles';
import { InspectorService } from 'src/app/shared/services/inspector.service';

@Component({
  selector: 'app-add-inspector',
  templateUrl: './add-inspector.component.html',
  styleUrls: ['./add-inspector.component.scss']
})
export class AddInspectorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  addInspectorGroup: FormGroup;
StringFun: any;
  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private inspectorServices: InspectorService,
  ) {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inspectorRole: string[] = INPECTORROLES;
  gender: string[] = GENDER;
  ngOnInit(): void {
    this.addInspectorGroup = new FormGroup({

      "first_name": new FormControl<string>('', [Validators.required,]),
      "middle_name": new FormControl<string>('', [Validators.required,]),
      "last_name": new FormControl<string>('', [Validators.required,]),
      "gender": new FormControl<string>('', [Validators.required,]),
      "role": new FormControl<string>('', [Validators.required,]),
      "national_id_expiry": new FormControl<string>('', [Validators.required,]),
      "national_id": new FormControl<string>('', [Validators.required,]),
      "password": new FormControl<string>('', [Validators.required,]),
      "email": new FormControl<string>('', [Validators.required, Validators.email]),
      "phone_number": new FormControl<string>('', [Validators.required, Validators.required]),
      "start_date": new FormControl<string>('', [Validators.required, Validators.required]),
      "end_date": new FormControl<string>('', [Validators.required, Validators.required]),
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
console.log(this.addInspectorGroup.value.role);
console.log(this.addInspectorGroup.value.gender);
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
  // camilCaseMethod(val:string){
  // return  StringFun.camilCaseMethod(val);
  // }
}
