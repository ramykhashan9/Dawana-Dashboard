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
  setUserName(userName: string) {
    this.setLocalStorage('userName', userName);
  }

  getuserName(): string {
    return this.getLocalStorage('userName');
  }
  setUserEmail(email: string) {
    this.setLocalStorage('email', email);
  }

  getuserEmail(): string {
    return this.getLocalStorage('email');
  }
  setUserDepartmentId(department: string) {
    this.setLocalStorage('department', department);
  }

  getuserDepartmentId(): string {
    return this.getLocalStorage('department');
  }
  setUserDepartmentName(departmentName: string) {
    this.setLocalStorage('departmentName', departmentName);
  }

  getuserDepartmentName(): string {
    return this.getLocalStorage('departmentName');
  }
  setUserDepartmentLevel(level: string) {
    this.setLocalStorage('level', level);
  }

  getuserDepartmentLevel(): string {
    return this.getLocalStorage('level');
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
  removeUserName(): any {
    return this.removeLocalStorage('userName');
  }
  removeUserId(): any {
    return this.removeLocalStorage('UserId');
  }
  setAdminRole(role: string) {
    this.setLocalStorage('role', role);
  }
  getAdminRole(): string {
    return this.getLocalStorage('role');
  }
  removeAdminRole(): any {
    return this.removeLocalStorage('role');
  }
  removeUserDepartmentId(): any {
    return this.removeLocalStorage('department');
  }
   removeUserDepartmentName(): any {
    return this.removeLocalStorage('departmentName');
  } 
  removeUserDepartmentLevel(): any {
    return this.removeLocalStorage('level');
  }

  logout() {
    this.removeCurrentAdmin();
    this.removeToken();
    this.removeUserName();
    this.removeUserId();
    this.removeAdminRole();
    this.removeUserDepartmentId();
    this.removeUserDepartmentName();
    this.removeUserDepartmentLevel();
    this.removeLocalStorage('admin');
    this.route.navigate(['/']);
    // location.reload();
  }
}
