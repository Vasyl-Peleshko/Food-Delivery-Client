import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { RoutingConstants } from './shared/constants/routing-constants';
import { ShoppingCartsComponent } from './pages/shopping-carts/shopping-carts.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NewCardComponent } from './pages/new-card/new-card.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { OrderTrackingComponent } from './pages/order-tracking/order-tracking.component';

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
        },
      },
      {
        path: RoutingConstants.PROFILE,
        component: UserProfileComponent,
        canActivate: [AuthGuard],
        data: {
          displayHeader: false,
          displayBackButton: false,
          displayFooter: false,
          displayTitle: false,
          headerTitle: 'Edit Profile',
          isHeaderTransparent: false
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
        component: ShoppingCartsComponent,
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
      {
        path: RoutingConstants.CHECKOUT,
        component: CheckoutComponent,
        data: {
          displayHeader: true,
          displayBackButton: true,
          displayFooter: false,
          displayTitle: true,
          isHeaderTransparent: false,
          headerTitle: 'Payment',
          displayHeaderIcon: true
        }
      },
      {
        path: RoutingConstants.NEWCARD,
        component: NewCardComponent,
        data: {
          displayHeader: true,
          displayBackButton: true,
          displayFooter: false,
          displayTitle: true,
          isHeaderTransparent: false,
          headerTitle: 'Add New Card',
          displayHeaderIcon: true
        }
      },
      {
        path: RoutingConstants.MYORDERS,
        component: OrdersHistoryComponent,
        data: {
          displayHeader: true,
          displayBackButton: true,
          displayFooter: false,
          displayTitle: true,
          isHeaderTransparent: false,
          headerTitle: 'My Orders',
          displayHeaderIcon: true
        }
      },
      {
        path: RoutingConstants.ORDERTRACKING,
        component: OrderTrackingComponent,
        data: {
          displayHeader: false,
          displayBackButton: true,
          displayFooter: false,
          displayTitle: true,
          isHeaderTransparent: false,
          headerTitle: 'My Orders',
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
