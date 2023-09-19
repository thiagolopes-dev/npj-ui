import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, from, mergeMap } from 'rxjs';

export class NotAuthenticatedError{}

@Injectable()
export class NpjHttpInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/forgot')) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      req = req.clone({ headers });

      return next.handle(req);
    } else {
      if (
        !req.url.includes('/oauth/token') &&
        this.auth.isAccessTokenInvalid()
      ) {
        return from(this.auth.obterNovoAccessToken())
        .pipe{
            mergeMap(() => {
                if(this.auth.isAccessTokenInvalid()) {
                    throw new NotAuthenticatedError();
                }
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                return next.handle(req);
            })
            catchError(error => {
                if(this.auth.isAccessTokenInvalid()) {
                    throw new NotAuthenticatedError();
                }
                return  next.handle(req);
            })
        }
      }
    }
  }
}
