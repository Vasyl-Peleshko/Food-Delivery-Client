import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { RestaurantResolver } from './components/restaurant-details/restaurant.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent },
  { path: 'restaurants/:id', component: RestaurantDetailsComponent, resolve: { restaurant: RestaurantResolver } },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];