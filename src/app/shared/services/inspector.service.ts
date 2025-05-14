import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class InspectorService {
  constructor(private http: HttpClient, private config: Config) { }
  HostUrl = this.config.ApiUrl + "dawana-service/api/v1/Inspector"
  getAllInspectors(skip:number=0,take:number=10) {
    return this.http.get<any>(`${this.HostUrl}/get-all-inspectors/${skip}/${take}`);
  }
  create(addForm: any) {
    return this.http.post<any>(`${this.HostUrl}/create-inspector`, addForm);
  }
  delete(inspectorId: number) {
    return this.http.delete<any>(`${this.HostUrl}/delete-inspector/${inspectorId}`);
  }
   edit(addForm: any,inspectorId:number) {
    return this.http.put<any>(`${this.HostUrl}/update-inspector/${inspectorId}`,addForm);
  
  }  
   getInspectorByName(name) {
    return this.http.post<any>(`${this.HostUrl}/search-by-name`,{
      'name':name
    });
  }
}
 
 