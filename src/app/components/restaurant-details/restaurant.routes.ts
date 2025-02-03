import { Routes } from '@angular/router';
import { RestaurantDetailsComponent } from './restaurant-details.component';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantExistsGuard } from '../../shared/guards/restaurant-exists.guard';

export const restaurantRoutes: Routes = [
  { path: `:id`, component: RestaurantDetailsComponent, resolve: { restaurant: RestaurantResolver }, canActivate: [RestaurantExistsGuard] }
];
