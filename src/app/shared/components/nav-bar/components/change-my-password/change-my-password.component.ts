import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
//import { Storage } from 'src/app/shared/config';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validator';

@Component({
  selector: 'app-change-my-password',
  templateUrl: './change-my-password.component.html',
  styleUrls: ['./change-my-password.component.scss']
})
export class ChangeMyPasswordComponent implements OnInit,OnDestroy{
  dir: string = "rtl";
  userId:string;
    subscriptions: Subscription = new Subscription();
    changeGroup:FormGroup;
  constructor( public translate: TranslateService, public ref: DynamicDialogRef,
   // private storage:Storage
  ) {
    
  }
  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }
  ngOnInit(): void {
    // this.userId=this.storage.getUserId().replace(/"/g, '');
    this.changeGroup=new FormGroup({
      password:new FormControl<string>(null,Validators.required),
      confirmPassword:new FormControl<string>(null,[Validators.required])
    },{validators:CustomValidators.passwordsMatch('password','confirmPassword')});
  }

 
  onCancel() {

    this.ref.close();
  }


}
