import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {NgFor } from '@angular/common'; 
import { RestaurantCardInterface } from '../../interfaces/restaurant-card.interface';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';

@Component({
  selector: 'fd-restaurant-card',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatIconModule, NgFor, ReviewFormatterPipe],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss'
})
export class RestaurantCardComponent {
  
  restaurantData : RestaurantCardInterface = {
    name: 'Italiano2',
    rating: 4.5,
    reviews: 749,
    imageUrl: 'https://i.pinimg.com/736x/a6/e1/8f/a6e18f7038d0e901d70e872f53ebf818.jpg',
    tags: ['BURGER', 'CHICKEN', 'FAST FOOD'],
    delivery: {
      isFree: true,
      icon: 'motorcycle',
      text: 'free delivery'
    },
    time: {
      icon: 'access_time',
      text: '10-15 mins'
    }
  };
}
