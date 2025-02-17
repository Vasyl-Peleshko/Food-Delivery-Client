import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FoodItemService } from '../../shared/services/food-item.service';
import { FoodItemInterface } from '../../shared/interfaces/restaurant-card.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodItemResolver implements Resolve<FoodItemInterface | null> {
  constructor(private foodItemService: FoodItemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FoodItemInterface | null> {
    const id = route.paramMap.get('id')!;
    
    return this.foodItemService.getFoodItemById(id).pipe(
      catchError(() => of(null)) 
    );
  }
}
