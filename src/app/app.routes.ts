import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { RoutingConstants } from './shared/constants/routing-constants';
import { shoppingCartsComponent } from './pages/shopping-carts/shopping-carts.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RoutingConstants.HOME,
        pathMatch: 'full'
      },
      {
        path: RoutingConstants.HOME,
        component: HomePageComponent,
        canActivate: [AuthGuard],
        data: {
          displayHeader: true,
          displayBackButton: false,
          displayFooter: true,
          displayTitle: true,
          isHeaderTransparent: false,
          headerTitle: 'Search Food',
          displayHeaderIcon: true
        }
      },
      {
        path: RoutingConstants.RESTAURANTS,
        loadChildren: () => import('./pages/restaurant-details/restaurant.routes')
          .then(m => m.restaurantRoutes),
      },
      {
        path: RoutingConstants.FOODITEMS,
        loadChildren: () => import('./pages/food-details/food-details.route')
          .then(m => m.foodDetailsRoutes),
      },
      {
        path: RoutingConstants.CART,
        component: shoppingCartsComponent,
        data: {
          displayHeader: false,
          displayBackButton: false,
          displayFooter: true,
          displayTitle: false,
          isHeaderTransparent: false,
          headerTitle: 'Search Food',
          displayHeaderIcon: true
        }
      },
    ]
  },
  {
    path: RoutingConstants.SIGNUP,
    component: SignupComponent
  },
  {
    path: RoutingConstants.LOGIN,
    component: SigninComponent
  },
  { path: '**', redirectTo: RoutingConstants.HOME, pathMatch: 'full' }
];
