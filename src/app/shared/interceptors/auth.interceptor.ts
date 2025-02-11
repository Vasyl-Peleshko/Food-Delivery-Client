/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const token = localStorage.getItem('token');
    this.loadingService.setLoading(true, req.url);

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(clonedRequest).pipe(
        finalize(() => {
          this.loadingService.setLoading(false, req.url);
        })
      );
    }
}
