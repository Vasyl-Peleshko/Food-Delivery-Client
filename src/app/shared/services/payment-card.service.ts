import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

export interface NewCard {
  fullName: string;
  cardNumber?: string;
  expirationDate?: string;
  selected?: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewCardService {
  private apiUrl = `${environment.apiUrl}/payment`;
  private cardsCache = new BehaviorSubject<NewCard[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * @param card
   */
  addNewCard(card: NewCard): Observable<NewCard> {
    return this.http.post<NewCard>(this.apiUrl, card);
  }

  getCards(): Observable<NewCard[]> {
    return this.http.get<NewCard[]>(this.apiUrl).pipe(
      tap((cards) => this.cardsCache.next(cards)),
      shareReplay(1) 
    );
  }

  getCachedCards(): Observable<NewCard[]> {
    return this.cardsCache.asObservable();
  }
}
