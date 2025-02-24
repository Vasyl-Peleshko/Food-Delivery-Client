import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { RoutingConstants } from '../constants/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    
    if (!this.authService.getToken() ) {
      this.router.navigate([`${RoutingConstants.LOGIN}}`]);
      return of(false);
    }

    return this.authService.getCachedUser().pipe(
      take(1),
      tap(user => !user && this.router.navigate([RoutingConstants.LOGIN])),
      map(user => !!user),
    )
  }
}
