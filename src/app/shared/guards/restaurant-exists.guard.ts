import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantExistsGuard implements CanActivate {
  constructor(private restaurantService: RestaurantService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const restaurantId = route.paramMap.get('id');
    
    return this.restaurantService.getRestaurants().pipe(
      map(restaurants => {
        const exists = restaurants.some(r => r.id === restaurantId);
        if (!exists) {
          this.router.navigate(['/home']); 
          return false;
        }
        return true;
      })
    );
  }
}
