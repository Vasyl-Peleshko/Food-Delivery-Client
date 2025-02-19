import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/signin']);
      return of(false);
    }

    return this.authService.userCache.pipe(
      switchMap(user => user ? of(true) : this.authService.getCachedUser()),
      tap(fetchedUser => {
        if (!fetchedUser) this.router.navigate(['/signin']);
      }),
      switchMap(fetchedUser => of(!!fetchedUser))
    );
  }
}
