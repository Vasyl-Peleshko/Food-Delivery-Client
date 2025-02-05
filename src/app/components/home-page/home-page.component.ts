import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { CardConfigInterface, PrimaryCardComponent } from '../primary-card/primary-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'fd-home-page',
  imports: [PrimaryCardComponent, AsyncPipe, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
 restaurants$!: Observable<ItemCardInterface[]>;

  constructor(
    private readonly restaurantsService: RestaurantService,
    private router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.restaurants$ = this.restaurantsService.getCachedRestaurants();
    this.restaurantsService.getRestaurants().subscribe();
  }

  addToFavorites(restaurant: ItemCardInterface): void {
    this.restaurantsService.addToFavorites(restaurant);
    console.log(`${restaurant.name} added to favorites!`);
  }
  
  navigateToRestaurant(id: string): void {
    this.router.navigate([`/${RoutingConstants.RESTAURANTS}/${id}`]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`${RoutingConstants.LOGIN}`]); 
  }

  restaurantCardConfig : CardConfigInterface = {
    isFoodItem: false,
    isPriceVisible: false,
    isRatingVisible: true,
    isTagsVisible: true,
    isDeliveryAndTimeVisible: true,
    isDescriptionVisible: false,
  };
}
