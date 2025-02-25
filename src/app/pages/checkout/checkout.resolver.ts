import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutResolver implements Resolve<number> {

  resolve(route: ActivatedRouteSnapshot): Observable<number> {
    const total = Number(route.queryParams['total']) || 0;
    return of(total);
  }
}
