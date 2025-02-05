import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';
import { CardConfigInterface, PrimaryCardComponent } from '../primary-card/primary-card.component';

@Component({
  selector: 'fd-restaurant-details',
  imports: [CommonModule, MatIconModule, ReviewFormatterPipe, PrimaryCardComponent],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent implements OnInit{
  restaurant$!: Observable<ItemCardInterface>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.restaurant$ = this.route.data.pipe(map(data => data['restaurant']));
  }

  foodItems: ItemCardInterface[] = [
    {
      description: "Ever wondered what's on a Big Mac®? The McDonald's Big Mac® is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac® sauce sandwiched between a sesame seed bun. It's topped off with pickles, crisp shredded lettuce, finely chopped onion, and a slice of American cheese. It contains no artificial flavors, preservatives, or added colors from artificial sources. Our pickle contains an artificial preservative, so skip it if you like.\n\n\nThere are 590 calories in a Big Mac® from McDonald's. Pair it with any of our beverages or grab a Big Mac® Combo Meal with our World Famous Fries® and Coca-Cola® or any of your favorite fountain drinks. Order a Big Mac® today using the McDonald's app to Mobile Order & Pay*! Download the McDonald's app and earn points on eligible orders with MyMcDonald's Rewards to redeem for a free Big Mac®.",
      feedbacks: 141,
      id: "mc_big_mac",
      imgUrl: "https://s7d1.scene7.com/is/image/mcdonalds/Header_BigMac_832x472:product-header-desktop?wid=550&hei=456&dpr=off",
      name: "Big Mac",
      price: 4.5,
      rating: 4.2,
    },
    {
      description: "The McDonald's Double Cheeseburger features two 100% pure all beef patties seasoned with just a pinch of salt and pepper. It's topped with tangy pickles, chopped onions, ketchup, mustard, and two melty American cheese slices. Wondering what is the difference between McDouble and Double Cheeseburger? It's the extra slice of American cheese in the Double Cheeseburger.\n\n \n\nThere are 450 calories in a McDonald's Double Cheeseburger. It contains no artificial flavors, preservatives or added colors from artificial sources.* Our pickle contains an artificial preservative, so skip it if you like. Pick up on your terms through the drive thru or with McDonald's curbside pickup when you Mobile Order & Pay! McDonald's app download and registration required.",
      feedbacks: 68,
      id: "mc_db_cheeseburger",
      imgUrl: "https://s7d1.scene7.com/is/image/mcdonalds/Header_DoubleCheeseburger_832x472:product-header-desktop?wid=550&hei=458&dpr=off",
      name: "Double Cheeseburger",
      price: 3,
      rating: 4.9,
    },
    {
      description: "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick milk foam. An alchemy of barista artistry and craft.",
      feedbacks: 236,
      id: "st_cappuccino",
      imgUrl: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_Cappuccino.jpg?impolicy=1by1_wide_topcrop_630",
      name: "Cappuccino",
      price: 3.5,
      rating: 4.7,
    },
    {
      description: "Our smooth signature Espresso Roast with rich flavor and caramelly sweetness is at the very heart of everything we do.",
      feedbacks: 87,
      id: "st_espresso",
      imgUrl: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_Espresso_Single.jpg?impolicy=1by1_wide_topcrop_630",
      name: "Espresso",
      price: 2,
      rating: 4.3,
    }
  ];

  foodCardConfig : CardConfigInterface = {
    isFoodItem: true,
    isPriceVisible: true,
    isRatingVisible: true,
    isTagsVisible: false,
    isDeliveryAndTimeVisible: false,
    isDescriptionVisible: true,
  }
}
