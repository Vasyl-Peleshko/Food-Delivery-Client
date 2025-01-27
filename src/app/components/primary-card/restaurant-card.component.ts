import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common'; 
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';

export interface ConfigCardInterface {
  isPriceVisible?: boolean;
  isRatingVisible?: boolean;
  isTagsVisible?: boolean;
  isDeliveryAndTimeVisible?: boolean;
  isDescriptionVisible?: boolean;
}


@Component({
  selector: 'fd-restaurant-card',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatIconModule, NgFor, NgIf, ReviewFormatterPipe],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss'
})
export class RestaurantCardComponent {
  @Input() config: ConfigCardInterface = {}; 
  @Input() itemData! : ItemCardInterface;  

}
