import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoutingConstants } from '../constants/routing-constants';
import { shareReplay, tap } from 'rxjs/operators';

export interface DeliveryAddress {
  region: string;
  city: string;
  street: string;
  novaPostDepartment: string;
}

export interface User {
  email: string;
  name: string;
  age?: number;
  phoneNumber?: string;
  deliveryAddress?: Partial<DeliveryAddress>;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/${RoutingConstants.AUTH}`;
  public userCache = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`).pipe(
      tap(user => this.userCache.next(user)),
      shareReplay(1)
    );
  }

  getCachedUser(): Observable<User | null> {
    if (this.userCache.value) {
      return this.userCache.asObservable();
    }
    return this.getUser();
  }

  login(userData: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, userData).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  register(userData: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  editUser(user: User): Observable<User> {
    if (!user.name || !user.email) {
      throw new Error('Name and email is required');
    }

    return this.http.patch<User>(`${this.apiUrl}/user`, user).pipe(
      tap(user => this.userCache.next(user)),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userCache.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
