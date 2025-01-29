/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { ItemCardInterface } from '../interfaces/restaurant-card.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants'; 
  private favoriteRestaurants: ItemCardInterface[] = [];

  constructor(private http: HttpClient) {}

  async getRestaurants(): Promise<ItemCardInterface[]> {
    try {
      const response = await lastValueFrom(this.http.get<ItemCardInterface[]>(this.apiUrl));
      return response;
    } catch (error) {
      console.error('Error occurred while fetching restaurants:', error);
      throw error;
    }
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