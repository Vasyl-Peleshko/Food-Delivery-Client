import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface CreateFeedbackDto {
  restaurantId: string;
  rating: number;
  text?: string;
}

export interface FeedbackResponse {
  _id: string;
  restaurantId: string;
  rating: number;
  text?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/feedback`;

  constructor(private http: HttpClient) {}

  submitFeedback(feedbackData: CreateFeedbackDto): Observable<FeedbackResponse> {
    return this.http.post<FeedbackResponse>(this.apiUrl, feedbackData);
  }
}
