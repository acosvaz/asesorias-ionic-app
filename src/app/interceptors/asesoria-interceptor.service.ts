import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaInterceptorService implements HttpInterceptor {

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      //authReq = req.clone({ headers: req.headers.set('Authorization' + token) });
    }
    return next.handle(authReq);
  }

  constructor(private tokenService: TokenService) { }
}

export const interceptorGrupos = [{provide: HTTP_INTERCEPTORS, useClass: AsesoriaInterceptorService, multi: true}];