import { Routes } from '@angular/router';
import { FoodDetailsComponent } from './food-details.component';
import { FoodItemResolver } from './food-details.resolver';

export const foodDetailsRoutes: Routes = [
  { 
    path: `:id`, 
    component: FoodDetailsComponent, 
    resolve: { foodItem: FoodItemResolver }, 
    data: {
        displayHeader: false,
        displayBackButton: false,
        displayFooter: true,
        isHeaderTransparent: false,
        headerTitle: 'Search Food',
        displayHeaderIcon: false
    } 
  }
];
