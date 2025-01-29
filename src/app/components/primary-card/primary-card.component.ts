import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common'; 
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';

export interface CardConfigInterface {
  isPriceVisible?: boolean;
  isRatingVisible?: boolean;
  isTagsVisible?: boolean;
  isDeliveryAndTimeVisible?: boolean;
  isDescriptionVisible?: boolean;
  isFoodItem?: boolean;
}

@Component({
  selector: 'fd-primary-card',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatIconModule, NgFor, NgIf, ReviewFormatterPipe],
  templateUrl: './primary-card.component.html',
  styleUrl: './primary-card.component.scss'
})
export class PrimaryCardComponent {
  @Input() config: CardConfigInterface = {}; 
  @Input() itemData! : ItemCardInterface;  
  @Output() favoriteClicked = new EventEmitter<ItemCardInterface>();
  
  ngOnInit() {
    console.log(this.itemData);  // Виводить ресторан у консоль
  }
  addToFavorites(): void {
    this.favoriteClicked.emit(this.itemData);
  }
}