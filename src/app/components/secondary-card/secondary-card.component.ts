import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ReviewFormatterPipe } from '../../shared/pipes/review-formatter.pipe';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { CardConfigInterface } from '../primary-card/primary-card.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'fd-secondary-card',
  imports: [CommonModule, MatCardModule, MatChipsModule, MatProgressBarModule, MatIconModule, ReviewFormatterPipe],
  templateUrl: './secondary-card.component.html',
  styleUrl: './secondary-card.component.scss'
})
export class SecondaryCardComponent {
  @Input() config: CardConfigInterface = {}; 
  @Input() itemData! : ItemCardInterface;  
}
