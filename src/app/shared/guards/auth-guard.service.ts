import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';
//import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
 constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
     let isAuth = this.authService.currentAdminValue;

    if (!isAuth) {
      this.router.navigate(['dawana/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
