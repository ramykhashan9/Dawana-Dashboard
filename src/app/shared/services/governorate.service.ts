import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {

  constructor(private http: HttpClient, private config: Config) { }
  HostUrl = this.config.ApiUrl + "dawana-service/api/v1/governorate";

  getAllGovernorate() {
    return this.http.get<any>(`${this.HostUrl}/getAll`);
  }
  createGovernorate(createForm:any){
    return this.http.post<any>(`${this.HostUrl}/create`,createForm);
  }
  getActiveGovernorateById(id:number){
    return this.http.get<any>(`${this.HostUrl}/active-governorate/${id}`);
  }
}
