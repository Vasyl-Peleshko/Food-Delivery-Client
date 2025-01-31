import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { CardConfigInterface, PrimaryCardComponent } from '../primary-card/primary-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'fd-home-page',
  imports: [PrimaryCardComponent, AsyncPipe, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
 restaurants$!: Observable<ItemCardInterface[]>;

  constructor(private readonly restaurantsService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurants$ = this.restaurantsService.getCachedRestaurants();
    this.restaurantsService.getRestaurants().subscribe();
  }

  addToFavorites(restaurant: ItemCardInterface): void {
    this.restaurantsService.addToFavorites(restaurant);
    console.log(`${restaurant.name} added to favorites!`);
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
