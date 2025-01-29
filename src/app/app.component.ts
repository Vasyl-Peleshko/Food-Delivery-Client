import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardConfigInterface, PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ItemCardInterface } from './shared/interfaces/restaurant-card.interface';
import { NgFor, AsyncPipe } from '@angular/common'; 
import { SecondaryCardComponent } from './components/secondary-card/secondary-card.component';
import { RestaurantService } from './shared/services/restaurant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'fd-root',
  imports: [RouterOutlet, MatSlideToggleModule, PrimaryCardComponent, SecondaryCardComponent, NgFor, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'food-delivery';
  restaurants$!: Observable<ItemCardInterface[]>;

  constructor(private restaurantsService: RestaurantService) {}

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

  foodCardConfig : CardConfigInterface = {
    isFoodItem: true,
    isPriceVisible: true,
    isRatingVisible: true,
    isTagsVisible: false,
    isDeliveryAndTimeVisible: false,
    isDescriptionVisible: true,
  }
}