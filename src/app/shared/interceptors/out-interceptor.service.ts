import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OutInterceptor implements HttpInterceptor {
  constructor(
    //private authService: AuthService

  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // let currentAdmin = this.authService.currentAdminValue;

    // if (currentAdmin) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${currentAdmin['access_token']}`,
    //     },
    //   });
    // }

    return next.handle(request);
  }
}
