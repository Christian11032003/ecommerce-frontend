import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  // Chiama il metodo getToken() del tuo AuthService
  const token = this.authService.getToken(); 

  if (token != null) {
    // Se lo trova, lo attacca alla busta della lettera (Request) di ogni richiesta HTTP
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next.handle(request);
  }
  
}
