import { Routes } from '@angular/router';
import { FoodDetailsComponent } from './food-details.component';
import { FoodItemResolver } from './food-details.resolver';
import { FoodItemExistsGuard } from '../../shared/guards/fooditem-exists.guard';

export const foodDetailsRoutes: Routes = [
  { 
    path: `:id`, 
    component: FoodDetailsComponent, 
    resolve: { foodItem: FoodItemResolver }, 
    canActivate: [FoodItemExistsGuard],
    data: {
        displayHeader: false,
        displayBackButton: false,
        displayFooter: false,
        isHeaderTransparent: false,
        headerTitle: 'Search Food',
        displayHeaderIcon: false
    } 
  }
];
