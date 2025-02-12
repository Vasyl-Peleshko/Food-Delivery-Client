import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantExistsGuard implements CanActivate {
  constructor(private restaurantService: RestaurantService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const restaurantId = route.paramMap.get('id');

    return this.restaurantService.getCachedRestaurants().pipe(
      take(1),
      switchMap(cachedRestaurants => {
        if (cachedRestaurants.length > 0) {
          const existsInCache = cachedRestaurants.some(r => r.id === restaurantId);
          
          if (existsInCache) {
            return of(true);
          }
        }
        
        return this.restaurantService.getRestaurants().pipe(
          take(1), 
          map(restaurants => {
            const existsInServer = restaurants.some(r => r.id === restaurantId);

            if (!existsInServer) {
              this.router.navigate(['/home']);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}
