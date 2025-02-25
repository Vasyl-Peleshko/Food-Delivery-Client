import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Payment } from '../../shared/interfaces/payment-card.interface';

@Injectable({
  providedIn: 'root'
})
export class NewCardResolver implements Resolve<Payment> {
    resolve(route: ActivatedRouteSnapshot): Observable<Payment> {
        const name = route.queryParams['name'] || 'Default';
        const icon = route.queryParams['icon'] || 'assets/mastercard-icon.jpg';
        const selected = route.queryParams['selected'] === 'true';

        return of({ name, icon, selected });
    }
}
