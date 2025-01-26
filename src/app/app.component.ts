import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';

@Component({
  selector: 'fd-root',
  imports: [RouterOutlet, MatSlideToggleModule, RestaurantCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-delivery';
}
