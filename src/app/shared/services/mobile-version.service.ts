import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MobileVersionService {
  constructor(private http: HttpClient, private config: Config) { }
  HostUrl = this.config.ApiUrl + "dawana-service/api/v1/dashboard"
  getAllMobileVersions() {
    return this.http.get<any>(`${this.HostUrl}/getAllMobileVersions`);
  }
  addMobileVersion(addForm: any) {
    return this.http.post<any>(`${this.HostUrl}/addMobileVersion`, addForm)
  }
  updateMobileVersion(updateForm: any) {
    return this.http.post<any>(`${this.HostUrl}/updateMobileVersion`, updateForm)
  }
}
