/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { ItemCardInterface } from '../interfaces/restaurant-card.interface';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  private restaurants: ItemCardInterface[] = [
    {
      name: 'Italiano1',
      rating: 4.5,
      reviews: 749,
      imageUrl: 'https://i.pinimg.com/236x/6e/b6/91/6eb6911ae012db6c355671b231003d6e.jpg',
      tags: ['COFFEE', 'DRINKS'],
      delivery: {
        isFree: true,
        icon: 'motorcycle',
        text: 'free delivery',
      },
      time: {
        icon: 'access_time',
        text: '10-15 mins',
      },
    },
    {
      name: 'Italiano2',
      rating: 4.5,
      reviews: 749,
      imageUrl: 'https://i.pinimg.com/736x/a6/e1/8f/a6e18f7038d0e901d70e872f53ebf818.jpg',
      tags: ['BURGER', 'CHICKEN'],
      delivery: {
        isFree: true,
        icon: 'motorcycle',
        text: 'free delivery',
      },
      time: {
        icon: 'access_time',
        text: '10-15 mins',
      },
    },
  ];

  private favoriteRestaurants: ItemCardInterface[] = [];

  constructor() {}

  getRestaurants(): ItemCardInterface[] {
    return this.restaurants;
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
