import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoutingConstants } from '../constants/routing-constants';

export interface User{
  email: string,
  name: string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/${RoutingConstants.AUTH}`; 

  constructor(private http: HttpClient) {}

  register(userData: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  login(userData: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, userData).pipe(
      tap(response => this.saveToken(response.token)),
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`).pipe(
      map(response => response) 
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
