import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { RestaurantService } from '../../shared/services/restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantResolver implements Resolve<ItemCardInterface | null> {
  constructor(private restaurantService: RestaurantService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ItemCardInterface | null> {
    const id = route.paramMap.get('id')!;
    return this.restaurantService.getRestaurantById(id).pipe(
      catchError(() => of(null)) 
    );
  }
}