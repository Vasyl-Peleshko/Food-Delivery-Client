import { Injectable } from '@angular/core';
import { ItemCardInterface } from '../interfaces/restaurant-card.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators'
import { CommonHelper } from '../helpers/common-helper';

export interface FilterOptions extends Record<string, unknown> {
  rating?: number | null;
  categories?: string[];
  sortBy?: string | null;
  name?: string | null;
}

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

  getFilteredRestaurants(filters: FilterOptions): Observable<ItemCardInterface[]> {
    const cleanedFilters = CommonHelper.removeBlankAttributes(filters); 

    let params = new HttpParams();

    if (cleanedFilters.rating) {
        params = params.set('rating', cleanedFilters.rating.toString());
    }

    if (cleanedFilters.categories && cleanedFilters.categories.length > 0) {
        params = params.set('categories', cleanedFilters.categories.join(','));
    }

    if (cleanedFilters.sortBy) {
        params = params.set('sortBy', cleanedFilters.sortBy);
    }

    if (cleanedFilters.name) {
        params = params.set('name', cleanedFilters.name);
    }
    
    return this.http.get<ItemCardInterface[]>(this.apiUrl, { params }).pipe(
      shareReplay(1) 
    );
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
