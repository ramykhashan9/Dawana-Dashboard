import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Inspector } from 'src/app/shared/helper/inspector_interface';
import { InspectorService } from 'src/app/shared/services/inspector.service';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';

@Component({
  selector: 'app-assign-to',
  templateUrl: './assign-to.component.html',
  styleUrls: ['./assign-to.component.scss']
})
export class AssignToComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  showHint: boolean = true;
  assignInspectorGroup: FormGroup;
  inspectors: Inspector[] = []
  constructor(public translate: TranslateService, public ref: DynamicDialogRef, private dialogConfig: DynamicDialogConfig, private pharmacyServices: PharmaciesService, private inspectorService: InspectorService,
  ) { }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.assignInspectorGroup = new FormGroup({
      "inspector": new FormControl<Inspector>(null, [Validators.required]),
    });
  }
  searchInspector(name: string) {
    let searchSub$ = this.inspectorService.getInspectorByName(name).subscribe(
      (res) => { this.inspectors = res['data']; },
      (error) => { console.log(error) },
    );
    this.subscription.add(searchSub$);
  }
  filterInspector(event: AutoCompleteCompleteEvent) {
    let text = event.query;
    if (text.trim().length > 2) {
      this.searchInspector(text);
    }


  }
  assignTo() {
    if (!this.assignInspectorGroup.valid) {
      return;
    }
    let assignToSunscribe = this.pharmacyServices.assignToInspector(this.assignInspectorGroup.value.inspector.id, this.dialogConfig.data.pharmacyId).subscribe(

      (res) => {
        if (res && res['status']) {
          this.ref.close(res);
        }
      },
      () => {

      }
    );
    this.subscription.add(assignToSunscribe);


  }
  onCancel() {
    this.ref.close(
      {
        "name": null
      }
    );
  }
}
