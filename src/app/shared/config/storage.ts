import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Storage {
  constructor(private route: Router) { }



  setLocalStorage(key: any, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getLocalStorage(key: any): any {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: any) {
    localStorage.removeItem(key);
  }

  setCurrentAdmin(admin: any) {
    this.setLocalStorage('admin', admin);
  }

  getCurrentAdmin(): any {
    return this.getLocalStorage('admin');
  }

  removeCurrentAdmin(): any {
    return this.removeLocalStorage('admin');
  }

  setToken(token: any) {
    this.setLocalStorage('token', token);
  }

  getToken(): any {
    return this.getLocalStorage('token');
  }
   
  
  setUserId(UserId: string) {
    this.setLocalStorage('UserId', UserId);
  }

  getUserId(): string {
    return this.getLocalStorage('UserId');
  }

  removeToken(): any {
    return this.removeLocalStorage('token');
  }
 
  removeUserId(): any {
    return this.removeLocalStorage('UserId');
  }
  setAdminRole(role: string) {
    this.setLocalStorage('role', role);
  }
  // getAdminRole(): string {
  //   return this.getLocalStorage('role');
  // }
  // removeAdminRole(): any {
  //   return this.removeLocalStorage('role');
  // }
  

  logout() {
    this.removeCurrentAdmin();
    this.removeToken();
     this.removeUserId();
    // this.removeAdminRole();
    
    this.removeLocalStorage('admin');
    this.route.navigate(['/']);
    // location.reload();
  }
}
