import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import { Storage } from '../config/storage';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLoginGuardService {
  constructor(private router: Router, private storage: Storage) { }

  canActivate() {
    let isAuth = this.storage.getUserId() !== null;
    if (!isAuth) {
      this.router.navigate(['dawana/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
