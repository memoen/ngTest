import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CredentialService} from './credential.service';

@Injectable()
export class ExpiredSessionInterceptor implements HttpInterceptor {
  constructor(private router: Router, private credential: CredentialService) {
  }

  /**
   * @description redirect to home page when request has error 401
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        event => {
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.credential.Token = '';
              this.router.navigateByUrl('/');
            }
          }
        }
      )
    );
  }
}
