import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface NewCard {
  fullName: string;
  cardNumber: string;
  expirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewCardService {
  private apiUrl = `${environment.apiUrl}/payment`;

  constructor(private http: HttpClient) {}

  /**
   * @param card
   */
  addNewCard(card: NewCard): Observable<NewCard> {
    return this.http.post<NewCard>(this.apiUrl, card);
  }
}
