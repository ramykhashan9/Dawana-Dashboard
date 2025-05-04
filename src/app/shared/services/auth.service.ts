import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentAdminSubject: BehaviorSubject<any>;
  public currentAdmin: Observable<any>;

  constructor(private http: HttpClient, private storage: Storage, private config: Config) {
    this.currentAdminSubject = new BehaviorSubject<any>(
      JSON.parse(this.storage.getCurrentAdmin())
    );
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }
  HostUrl: string = this.config.ApiUrl + 'dawana-service/api/v1/dashboard';

  public get currentAdminValue(): any {
    return this.currentAdminSubject.value;
  }
  login(email: string, password: string) {
    return this.http.post<any>(`${this.HostUrl}/login`, { email, password });
  }
  confirmLogin(id: string, code: number) {
    return this.http.post<any>(`${this.HostUrl}/confirm-login`, { id, code });
  }
  resendCode(id: string) {
    return this.http.post<any>(`${this.HostUrl}/resend-code`, { id });
  }



  logout() {
    this.storage.logout();
    this.currentAdminSubject.next(null);
  }
}
