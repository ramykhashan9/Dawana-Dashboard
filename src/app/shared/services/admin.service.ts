import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private config: Config) { }
  HostUrl = this.config.ApiUrl + "dawana-service/api/v1/admin"
  getAllAdmins() {
    return this.http.get<any>(`${this.HostUrl}/get-all-admins`);
  }
  create(addForm: any) {
    return this.http.post<any>(`${this.HostUrl}/create-admin`, addForm);
  }
  update(adminId: number, updateForm: any) {
    return this.http.put<any>(`${this.HostUrl}/update-admin/${adminId}`, updateForm);
  }
  delete(adminId: number) {
    return this.http.delete<any>(`${this.HostUrl}/delete-admin/${adminId}`);
  }
}
