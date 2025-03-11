import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemCardInterface } from '../../shared/interfaces/restaurant-card.interface';
import { FormsModule } from '@angular/forms';
import { FeedbackService, CreateFeedbackDto } from '../../shared/services/feedback.service';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fd-feedback-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback-component.component.html',
  styleUrl: './feedback-component.component.scss'
})
export class FeedbackComponentComponent implements OnInit {
  restaurant$!: Observable<ItemCardInterface>;
  restaurantId!: string;
  rating = 0;
  reviewText = '';
  isSubmitting = false;
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.restaurant$ = this.route.data.pipe(map(data => data['restaurant']));
    
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
    });
  }

  rateOrder(stars: number): void {
    this.rating = stars;
  }

  submitReview(): void {
    if (!this.restaurantId || this.rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    this.isSubmitting = true;

    const feedbackData: CreateFeedbackDto = {
      restaurantId: this.restaurantId,
      rating: this.rating,
      text: this.reviewText
    };

    this.feedbackService.submitFeedback(feedbackData).subscribe({
      next: () => {
        this.toastr.success('Feedback submitted successfully!', 'Success');

        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate([RoutingConstants.HOME]);
        }, 5000);
      },
      error: error => {
        console.error('❌ Error submitting feedback:', error);
        this.isSubmitting = false;
      }
    });
  }
}
