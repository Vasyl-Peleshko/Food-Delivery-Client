import { Injectable } from '@angular/core';
import { ItemCardInterface } from '../interfaces/restaurant-card.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  private apiUrl = `${environment.apiUrl}/restaurants`; 
  private favoriteRestaurants: ItemCardInterface[] = [];
  private restaurantsCache = new BehaviorSubject<ItemCardInterface[]>([]);

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<ItemCardInterface[]> {
    return this.http.get<ItemCardInterface[]>(this.apiUrl).pipe(
      map((restaurants) =>
        restaurants.sort((a, b) => (Number(a.delivery?.cost ?? 0) - Number(b.delivery?.cost ?? 0)))
      ),
      tap((sortedRestaurants) => this.restaurantsCache.next(sortedRestaurants))
    );
  }

  getCachedRestaurants(): Observable<ItemCardInterface[]> {
    return this.restaurantsCache.asObservable();
  }

  getRestaurantById(id: string): Observable<ItemCardInterface> {
    return this.http.get<ItemCardInterface>(`${this.apiUrl}/${id}`);
  }

  addToFavorites(restaurant: ItemCardInterface): void {
    if (!this.favoriteRestaurants.includes(restaurant)) {
      this.favoriteRestaurants.push(restaurant);
    }
  }

  getFavoriteRestaurants(): ItemCardInterface[] {
    return this.favoriteRestaurants;
  }
}