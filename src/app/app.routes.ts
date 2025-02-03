import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { environment } from './shared/routes/environmentRoutes';
import { restaurantRoutes } from './shared/routes/restaurant.routes';

export const routes: Routes = [
  { path: '', redirectTo: environment.routes.home, pathMatch: 'full' }, 
  { path: environment.routes.home, component: HomePageComponent },
  ...restaurantRoutes,
  { path: '**', redirectTo: environment.routes.home, pathMatch: 'full' },
];
