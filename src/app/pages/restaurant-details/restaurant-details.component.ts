import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FoodItemInterface, ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';
import { CardConfigInterface, PrimaryCardComponent } from '../../components/primary-card/primary-card.component';
import { FoodItemService } from '../../shared/services/food-item.service';
import { RoutingConstants } from '../../shared/constants/routing-constants';

@Component({
  selector: 'fd-restaurant-details',
  imports: [CommonModule, MatIconModule, ReviewFormatterPipe, PrimaryCardComponent],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent implements OnInit{
  restaurant$!: Observable<ItemCardInterface>;
  foodItems$!: Observable<FoodItemInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private readonly foodItemsService: FoodItemService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.restaurant$ = this.route.data.pipe(map(data => data['restaurant']));
    this.foodItems$ = this.foodItemsService.getCachedFoodItems();
    this.foodItemsService.getFoodItems().subscribe();
  }

  navigateToFoodItem(id: string): void {
      this.router.navigate([`/${RoutingConstants.FOODITEMS}/${id}`]);
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
