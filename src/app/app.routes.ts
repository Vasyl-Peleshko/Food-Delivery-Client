import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RoutingConstants } from './shared/constants/routing-constants';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
  { path: '', redirectTo: RoutingConstants.HOME, pathMatch: 'full' }, 
  { path: RoutingConstants.HOME, component: HomePageComponent },
  { path: RoutingConstants.SIGNUP, component: SignupComponent },
  { path: RoutingConstants.LOGIN, component: SigninComponent },
  { 
    path: RoutingConstants.RESTAURANTS, 
    loadChildren: () => import('./components/restaurant-details/restaurant.routes')
      .then(m => m.restaurantRoutes) 
  },  
  { path: '**', redirectTo: RoutingConstants.HOME, pathMatch: 'full' },
];
