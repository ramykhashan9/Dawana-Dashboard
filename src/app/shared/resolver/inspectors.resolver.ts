
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
 import { InspectorService } from '../services/inspector.service';

@Injectable({
  providedIn: 'root',
})
export class InspectorRedolver implements Resolve<any> {
  constructor(private settingsService: InspectorService) { }


  resolve(

  ): Observable<any> {
    return this.settingsService.getAllInspectors();
  }
}