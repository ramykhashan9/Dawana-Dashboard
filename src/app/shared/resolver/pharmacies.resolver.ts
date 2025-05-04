
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PharmaciesService } from '../services/pharmacies.service';

@Injectable({
  providedIn: 'root',
})
export class PharmaciseRedolver implements Resolve<any> {
  constructor(private settingsService: PharmaciesService) { }


  resolve(

  ): Observable<any> {
    return this.settingsService.getAllPharmacies({});
  }
}