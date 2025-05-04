import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ErrorInterceptor implements HttpInterceptor {
 constructor(
  // private auth: AuthService,
   private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        //   if(err.status ==403 || err.status == 401){
        //   this.auth.logout();
        //   location.reload();
        // }
        if (err.status == 404) {
          this.router.navigate(['dawana/auth/error']);
        }

        return next.handle(request);
      })
    );
  }
}
