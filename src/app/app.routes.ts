import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RoutingConstants } from './shared/constants/routing-constants';

export const routes: Routes = [
  { path: '', redirectTo: RoutingConstants.HOME, pathMatch: 'full' }, 
  { path: RoutingConstants.HOME, component: HomePageComponent },
  { 
    path: RoutingConstants.RESTAURANTS, 
    loadChildren: () => import('./components/restaurant-details/restaurant.routes')
      .then(m => m.restaurantRoutes) 
  },  
  { path: '**', redirectTo: RoutingConstants.HOME, pathMatch: 'full' },
];
