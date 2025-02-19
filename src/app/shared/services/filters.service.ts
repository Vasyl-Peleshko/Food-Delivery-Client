import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  readonly categories = ['Fast food', 'Sushi', 'Asian', 'Mexican', 'Pizza', 'Donut'];

  readonly sortOptions = [
    { label: 'Popular', value: 'feedbacks' },
    { label: 'Quickest delivery', value: 'quickestDelivery' },
    { label: 'Cost low to high', value: 'costLowToHigh' },
    { label: 'Cost high to low', value: 'costHighToLow' }
  ];

  readonly ratings = [5, 4, 3, 2, 1];
}
