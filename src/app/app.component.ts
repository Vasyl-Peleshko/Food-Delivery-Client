import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardConfigInterface, PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { ItemCardInterface } from './shared/interfaces/restaurant-card.interface';
import { NgFor } from '@angular/common'; 
import { SecondaryCardComponent } from './components/secondary-card/secondary-card.component';

@Component({
  selector: 'fd-root',
  imports: [RouterOutlet, MatSlideToggleModule, PrimaryCardComponent, SecondaryCardComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-delivery';

   restaurants : ItemCardInterface[] = [
   {
      name: 'Italiano1',
      rating: 4.5,
      reviews: 749,
      imageUrl: 'https://i.pinimg.com/236x/6e/b6/91/6eb6911ae012db6c355671b231003d6e.jpg',
      tags: ['COFFEE', 'DRINKS'],
      delivery: {
        isFree: true,
        icon: 'motorcycle',
        text: 'free delivery'
      },
      time: {
        icon: 'access_time',
        text: '10-15 mins'
      }
    },
    {
      name: 'Italiano2',
      rating: 4.5,
      reviews: 749,
      imageUrl: 'https://i.pinimg.com/736x/a6/e1/8f/a6e18f7038d0e901d70e872f53ebf818.jpg',
      tags: ['BURGER', 'CHICKEN'],
      delivery: {
        isFree: true,
        icon: 'motorcycle',
        text: 'free delivery'
      },
      time: {
        icon: 'access_time',
        text: '10-15 mins'
      }
    },
  ]

  foodItem: ItemCardInterface = {
    name: 'Spageti',
    rating: 4.5,
    reviews: 749,
    imageUrl: 'https://i.pinimg.com/736x/a6/e1/8f/a6e18f7038d0e901d70e872f53ebf818.jpg',
    price: 12.99,
    description: 'Italian Burger.'
  };
  
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
