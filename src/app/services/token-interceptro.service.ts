import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptroService implements HttpInterceptor{

  intercept(req ,next) {
      const token = localStorage.getItem('token');
      const tokenHeader = req.clone({
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      });
      return next.handle(tokenHeader);
  }
  constructor() { }
}
