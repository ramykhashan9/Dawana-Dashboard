import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Storage } from 'src/app/shared/config';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit, OnDestroy {

  loginGroup: FormGroup;
  subscriptions: Subscription = new Subscription();
  loginFormSubmitted = false;
  isLoginFailed = false;
  authMessage = '';
  constructor(public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private storage: Storage,
    private messageService: MessageService
  ) {
    // if ("currentAdminValue : " + this.authService.currentAdminValue) {
    //   this.router.navigate(['/dawana/pages/dashboard']);
    // }
  }

  dir: string = "rtl";
  ngOnInit(): void {
    this.loginGroup = new FormGroup({
      email: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required,]),
    });
  }
  get lf() {
    return this.loginGroup.controls;
  }

  isEmailValid = true;
  isPasswordValid = true;
  login() {
    if (this.lf.email.invalid && this.lf.email.errors?.required) {
      this.isEmailValid = false;
    } else {
      this.isEmailValid = true;
    }

    if (this.lf.password.invalid && this.lf.password.errors?.required) {
      this.isPasswordValid = false;
    } else {
      this.isPasswordValid = true;
    }
    if (this.loginGroup.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true,
    });


    let loginSub$ = this.authService

      .login(this.loginGroup.value.email.toLowerCase(), this.loginGroup.value.password)
      .subscribe(
        (response) => {
          console.log(response);
          this.storage.setUserId(response.data["id"]);
          // this.storage.setToken(response.data["access_token"]);
          this.authMessage = response.message;
          this.messageService.add({ key: 'tr', severity: 'success', summary: 'Success', detail: this.authMessage });
          this.spinner.hide();
          this.router.navigate(['/dawana/auth/confirm-login']);
        },
        (response: HttpErrorResponse) => {
          this.isLoginFailed = true;
          this.spinner.hide();
          this.authMessage = response.error.message;
          this.messageService.add({ key: 'tr', severity: 'error', summary: 'Error', detail: this.authMessage });
        }
      );
    this.subscriptions.add(loginSub$);

  }
  isShowPassword: boolean = false;
  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }
  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
