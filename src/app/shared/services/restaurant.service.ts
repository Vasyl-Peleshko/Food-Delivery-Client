import { Injectable } from '@angular/core';
import { ItemCardInterface } from '../interfaces/restaurant-card.interface';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants'; 
  private favoriteRestaurants: ItemCardInterface[] = [];

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<ItemCardInterface[]> {
    return this.http.get<ItemCardInterface[]>(this.apiUrl);
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