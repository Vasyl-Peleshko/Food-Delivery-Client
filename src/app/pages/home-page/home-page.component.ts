import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { RestaurantService } from '../../shared/services/restaurant.service';
import { CardConfigInterface, PrimaryCardComponent } from '../../components/primary-card/primary-card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { AuthService, User } from '../../shared/services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersService } from '../../shared/services/filters.service';

@Component({
  selector: 'fd-home-page',
  imports: [PrimaryCardComponent, AsyncPipe, CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements OnInit {
  restaurants$!: Observable<ItemCardInterface[]>;
  isSidebarOpen = false;
  isFilterSidebarOpen = false;
  user: User | null = null; 

  ratingControl = new FormControl<number | null>(null);
  categoryControl = new FormControl<string[]>([]);
  sortControl = new FormControl<string | null>(null);
  searchControl = new FormControl<string>('');
  
  minPrice = 0;
  maxPrice = 500;
  categories: string[] = [];
  sortOptions: { label: string, value: string }[] = [];
  ratings: number[] = [];

  constructor(
    private readonly restaurantsService: RestaurantService,
    private router: Router,
    private readonly authService: AuthService,
    private readonly filtersService: FiltersService,
  ) {
    this.categories = this.filtersService.categories;
    this.sortOptions = this.filtersService.sortOptions;
    this.ratings = this.filtersService.ratings;
  }

  ngOnInit(): void {
    this.restaurants$ = this.restaurantsService.getCachedRestaurants();
    this.restaurantsService.getRestaurants().subscribe();
    this.loadUser();
  }

  addToFavorites(restaurant: ItemCardInterface): void {
    this.restaurantsService.addToFavorites(restaurant);
    console.log(`${restaurant.name} added to favorites!`);
  }
  
  navigateToRestaurant(id: string): void {
    this.router.navigate([`/${RoutingConstants.RESTAURANTS}/${id}`]);
  }

  // authorization part
  loadUser() {
    this.authService.getCachedUser().subscribe({
      next: (userData) => this.user = userData, 
      error: (err) => console.error('Error fetching user:', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`${RoutingConstants.LOGIN}`]); 
  }

  // Sidebar part
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleFilterSidebar() {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  closeFilterSidebar() {
    this.isFilterSidebarOpen = false;
  }

  updateRange() {
    if (this.minPrice >= this.maxPrice) {
      this.minPrice = this.maxPrice - 1;
    }
  }

  // filter functionality part
  toggleCategory(category: string) {
    const selectedCategories = this.categoryControl.value || [];
    const categoryLower = category.toLowerCase();

    if (selectedCategories.includes(categoryLower)) {
      this.categoryControl.setValue(selectedCategories.filter(c => c !== categoryLower));
    } else {
      this.categoryControl.setValue([...selectedCategories, categoryLower]);
    }
  }

  selectRating(rating: number) {
    this.ratingControl.setValue(this.ratingControl.value === rating ? null : rating);
  }

  sortMapping: Record<string, string> = {
    'Popular': 'feedbacks',
    'Quickest delivery': 'quickestDelivery',
    'Cost low to high': 'costLowToHigh',
    'Cost high to low': 'costHighToLow'
  };

  selectSortBy(sort: string) {
    const mappedSort = this.sortMapping[sort] || null;
    this.sortControl.setValue(this.sortControl.value === mappedSort ? null : mappedSort);
  }

  applyFilters() {
    const filters = {
      rating: this.ratingControl.value,
      categories: this.categoryControl.value?.length ? this.categoryControl.value : undefined,
      sortBy: this.sortControl.value
    };
  
    this.restaurants$ = this.restaurantsService.getFilteredRestaurants(filters);
    this.resetFilters();
    this.closeFilterSidebar();
  }

  resetFilters() {
    this.ratingControl.setValue(null);
    this.categoryControl.setValue([]);
    this.sortControl.setValue(null);
  }

  searchRestaurants(query: string) {
    this.restaurants$ = this.restaurantsService.getFilteredRestaurants({ name: query });
  }

  onSearchBlur() {
    const query = this.searchControl.value?.trim();

    if (query && query.length > 1) {
        this.searchRestaurants(query);
    }
  }

  restaurantCardConfig : CardConfigInterface = {
    isFoodItem: false,
    isPriceVisible: false,
    isRatingVisible: true,
    isTagsVisible: true,
    isDeliveryAndTimeVisible: true,
    isDescriptionVisible: false,
  };
}
