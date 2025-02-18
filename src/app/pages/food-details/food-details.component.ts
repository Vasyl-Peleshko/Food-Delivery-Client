import { Component, OnInit } from '@angular/core';
import { FoodItemInterface } from '../../shared/interfaces/restaurant-card.interface';
import { ActivatedRoute } from '@angular/router';
import { CardConfigInterface } from '../../components/primary-card/primary-card.component';
import { CommonModule } from '@angular/common';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'fd-food-details',
  imports: [CommonModule, ReviewFormatterPipe],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss'
})
export class FoodDetailsComponent implements OnInit {
  isExpanded = false;
  selectedAddon?: string = '';
  quantity = 0; 
  foodItem!: FoodItemInterface

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.foodItem = this.route.snapshot.data['foodItem'];
  }

  addToCart() {    
    this.cartService.addToCart(this.foodItem, this.quantity, this.selectedAddon);
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
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
