import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FoodItemService } from '../services/food-item.service';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodItemExistsGuard implements CanActivate {
  constructor(private foodItemService: FoodItemService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const foodItemId = route.paramMap.get('id');

    return this.foodItemService.getCachedFoodItems().pipe(
      take(1),
      switchMap(cachedFoodItems => {
        if (cachedFoodItems.length > 0) {
          const existsInCache = cachedFoodItems.some(item => item.id === foodItemId);
          
          if (existsInCache) {
            return of(true);
          }
        }
        
        return this.foodItemService.getFoodItems().pipe(
          take(1), 
          map(foodItems => {
            const existsInServer = foodItems.some(item => item.id === foodItemId);

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
