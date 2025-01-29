import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardConfigInterface, PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ItemCardInterface } from './shared/interfaces/restaurant-card.interface';
import { NgFor } from '@angular/common'; 
import { SecondaryCardComponent } from './components/secondary-card/secondary-card.component';
import { RestaurantService } from './shared/services/restaurant.service';

@Component({
  selector: 'fd-root',
  imports: [RouterOutlet, MatSlideToggleModule, PrimaryCardComponent, SecondaryCardComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'food-delivery';
  restaurants: ItemCardInterface[] = [];

  constructor(private restaurantsService: RestaurantService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.restaurants = await this.restaurantsService.getRestaurants();
    } catch (error) {
      console.error('Помилка при отриманні ресторанів:', error);
    }
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

  foodCardConfig : CardConfigInterface = {
    isFoodItem: true,
    isPriceVisible: true,
    isRatingVisible: true,
    isTagsVisible: false,
    isDeliveryAndTimeVisible: false,
    isDescriptionVisible: true,
  }
}
