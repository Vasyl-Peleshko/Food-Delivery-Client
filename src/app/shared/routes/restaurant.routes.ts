// src/app/components/restaurant-details/restaurant.routes.ts
import { Routes } from '@angular/router';
import { environment } from './environmentRoutes';
import { RestaurantDetailsComponent } from '../../components/restaurant-details/restaurant-details.component';
import { RestaurantResolver } from '../../components/restaurant-details/restaurant.resolver';
import { RestaurantExistsGuard } from '../guards/restaurant-exists.guard';

export const restaurantRoutes: Routes = [
  { path: environment.routes.restaurant, component: RestaurantDetailsComponent, resolve: { restaurant: RestaurantResolver }, canActivate: [RestaurantExistsGuard] }
];
