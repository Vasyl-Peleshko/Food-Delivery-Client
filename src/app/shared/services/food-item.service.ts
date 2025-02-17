import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FoodItemInterface } from '../interfaces/restaurant-card.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private apiUrl = `${environment.apiUrl}/food-details`;
  private favoriteFoodItems: FoodItemInterface[] = [];
  private foodItemsCache = new BehaviorSubject<FoodItemInterface[]>([]);

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<FoodItemInterface[]> {
    return this.http.get<FoodItemInterface[]>(this.apiUrl).pipe(
      map((foodItems) =>
        foodItems.sort((a, b) => b.rating - a.rating) 
      ),
      tap((sortedFoodItems) => this.foodItemsCache.next(sortedFoodItems))
    );
  }

  getCachedFoodItems(): Observable<FoodItemInterface[]> {
    return this.foodItemsCache.asObservable();
  }

  getFoodItemById(id: string): Observable<FoodItemInterface> {
    return this.http.get<FoodItemInterface>(`${this.apiUrl}/${id}`);
  }

  addToFavorites(foodItem: FoodItemInterface): void {
    if (!this.favoriteFoodItems.some(item => item.id === foodItem.id)) {
      this.favoriteFoodItems.push(foodItem);
    }
  }

  getFavoriteFoodItems(): FoodItemInterface[] {
    return this.favoriteFoodItems;
  }
}
