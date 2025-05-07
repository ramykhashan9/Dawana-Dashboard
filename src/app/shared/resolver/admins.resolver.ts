
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminsRedolver implements Resolve<any> {
  constructor(private adminService: AdminService) { }


  resolve(

  ): Observable<any> {
    return this.adminService.getAllAdmins();
  }
}