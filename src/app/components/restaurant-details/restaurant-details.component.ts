import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';

@Component({
  selector: 'fd-restaurant-details',
  imports: [CommonModule, MatIconModule, ReviewFormatterPipe],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent{
  restaurant$: Observable<ItemCardInterface>;

  constructor(private route: ActivatedRoute) {
    this.restaurant$ = this.route.data.pipe(map(data => data['restaurant']));    
  }
}