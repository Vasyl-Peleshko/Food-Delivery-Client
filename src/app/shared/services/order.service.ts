import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

export interface OrderInterface {
    _id: string;
    userId: string;
    products: ProductInterface[];
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductInterface {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imgUrl: string;
    rating: number;
    restaurantId: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/order`; 
  private ordersCache = new BehaviorSubject<OrderInterface[]>([]);

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(this.apiUrl).pipe(
      tap((orders) => this.ordersCache.next(orders)),
      shareReplay(1)
    );
  }

  getCachedOrders(): Observable<OrderInterface[]> {
    return this.ordersCache.asObservable();
  }

  getOrderById(id: string): Observable<OrderInterface> {
    return this.http.get<OrderInterface>(`${this.apiUrl}/${id}`);
  }
}
