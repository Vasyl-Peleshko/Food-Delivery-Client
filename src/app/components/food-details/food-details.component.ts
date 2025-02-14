import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FoodItemInterface } from '../../shared/interfaces/restaurant-card.interface';
import { ActivatedRoute } from '@angular/router';
import { CardConfigInterface } from '../primary-card/primary-card.component';
import { CommonModule } from '@angular/common';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';

@Component({
  selector: 'fd-food-details',
  imports: [CommonModule, ReviewFormatterPipe],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss'
})
export class FoodDetailsComponent implements OnInit {
  foodItem$!: Observable<FoodItemInterface>;
  isExpanded = false;
  selectedAddon?: string = '';
  quantity = 2; 

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.foodItem$ = this.route.data.pipe(map(data => data['foodItem']))
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }

  selectAddon(addonName: string) {
    this.selectedAddon = addonName;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  foodCardConfig : CardConfigInterface = {
    isFoodItem: true,
    isPriceVisible: true,
    isRatingVisible: true,
    isTagsVisible: false,
    isDeliveryAndTimeVisible: false,
    isDescriptionVisible: true,
  }
}
