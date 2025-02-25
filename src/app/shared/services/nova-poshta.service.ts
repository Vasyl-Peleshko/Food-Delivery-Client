import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Warehouse {
  SiteKey: string;
  Description: string;
  CityRef: string;
  SettlementTypeDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class NovaPoshtaService {
  private backendUrl = `${environment.apiUrl}/nova-poshta/warehouses`;

  constructor(private http: HttpClient) {}

  getWarehouses(cityName: string, searchQuery = ''): Observable<Warehouse[]> {
    return this.http.get<{ success: boolean; data: Warehouse[] }>(`${this.backendUrl}?city=${cityName}&search=${searchQuery}`).pipe(
      map(response => response.data ?? [])
    );
  }
}
