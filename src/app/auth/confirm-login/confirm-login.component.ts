import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Storage } from '../../shared/config/storage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss']
})
export class ConfirmLoginComponent implements OnInit, OnDestroy {
  loginGroup: FormGroup;
  subscriptions: Subscription =new Subscription();
  loginFormSubmitted = false;
  isLoginFailed = false;
  authMessage = '';
  userId: string;
  constructor(public translate: TranslateService,
      private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private storage: Storage,
    private messageService: MessageService
      
   ) {
  }
  dir: string = "rtl";
  ngOnInit(): void {
    this.userId = this.storage.getUserId().replace(/"/g, '');

  }
  get lf() {
    return this.loginGroup.controls;
  }

  pincode: string;
  isCodeValid:boolean=true;
  confirmLogin() {
    let code= +this.pincode;
    if (this.length !== 4) {
     
      return;
    }

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true,
    });

  
      this.authService
      .confirmLogin(+this.userId,code)
      .subscribe(
        (response) => {
          console.log(response);
          this.storage.setToken(response.data["access_token"]);
          // this.storage.setUserName(response.data["userName"]);
          // this.storage.setUserEmail(response.data["email"]);
          this.storage.setUserId(response.data["id"]);
          // if(response.data['department_level'] === "الإدارة العامة للشكاوي"){
          //   this.storage.setAdminRole("SuperAdmin");
          // }else{
          //   this.storage.setAdminRole(response.data.userType);
          // }
          
          // this.storage.setCurrentAdmin(response.data);
          // this.storage.setUserDepartmentId(response.data['department']['_id']);
          // this.storage.setUserDepartmentName(response.data['department']['name']);
          // this.storage.setUserDepartmentLevel(response.data['department_level']);
           this.authService.currentAdminSubject.next(response.data);
          this.authMessage = response.message;
          this.isCodeValid=true && (this.length ==4);
          this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: this.authMessage });
          this.spinner.hide();
          // this.router.navigate(['/dawana/pages/dashboard']);
           this.router.navigate(['/dawana/pages/pharmacies']);
          
        
        },
        (response: HttpErrorResponse) => {
          this.isLoginFailed = true;
          this.isCodeValid=false && (this.length ==4);
          this.spinner.hide();
          this.authMessage = response.error.message;
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'Error', detail: this.authMessage });
        }
      );
  }

  onCodeCompleted(code: string) {
    
    this.pincode = code;
    console.log(code.length);
  }
  length:number;
  onCodeChanged(code: string) {
    this.length=code.length;
  }

  resendCode() {
    let resendCodeSub$ = this.authService.resendCode(+this.userId).subscribe(
      (res) => {
        this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: res['message'] });
      },
      (error) => {
        this.messageService.add({ key: 'tr', severity: 'error', summary: 'Failed', detail: error['error']['message'] });
      }
    );

    this.subscriptions.add(resendCodeSub$);
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
