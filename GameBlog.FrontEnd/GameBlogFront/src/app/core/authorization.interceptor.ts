import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private readonly authorizationService: AuthorizationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authorizationService.isAuthorized()) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem("Token")!,
        }
      })
    }

    return next.handle(request);
  }
}
