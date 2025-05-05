import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Pharmacies } from 'src/app/shared/helper/pharmacies';
 
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  pharmacy:Pharmacies;
  constructor( public translate: TranslateService, public ref: DynamicDialogRef,  public config: DynamicDialogConfig
  ) {
    this.pharmacy=this.config.data.pharmacy;
  }
}
