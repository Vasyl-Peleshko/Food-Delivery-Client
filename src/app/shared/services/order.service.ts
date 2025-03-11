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
    deliveryAddress: DeliveryAddressInterface;
    restaurantAddress: string;
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
    ingredients: string[];
    addons?: AddonInterface[];
}

export interface AddonInterface {
  name: string;
  price: number;
  countable: boolean;
}

export interface DeliveryAddressInterface {
  city: string;
  novaPostDepartment: string;
}

export interface CreateOrderDto {
  products: ProductInterface[];
  totalPrice: number;
  status?: string;
  deliveryAddress: DeliveryAddressInterface;
  restaurantAddress: string;
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

  createOrder(orderData: CreateOrderDto): Observable<OrderInterface> {
    console.log(orderData);
    
    return this.http.post<OrderInterface>(this.apiUrl, orderData);
  }
}
