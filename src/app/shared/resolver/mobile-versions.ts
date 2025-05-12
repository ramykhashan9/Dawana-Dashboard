
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MobileVersionService } from '../services/mobile-version.service';

@Injectable({
  providedIn: 'root',
})
export class MobileVersionResolver implements Resolve<any> {
  constructor(private settingsService: MobileVersionService) { }


  resolve(

  ): Observable<any> {
    return this.settingsService.getAllMobileVersions();
  }
}