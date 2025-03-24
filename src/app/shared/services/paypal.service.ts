/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayPalService {
  private clientId = environment.paypalClientId;

  getPayPalConfig(totalAmount: number, onPaymentSuccess: () => void): Observable<IPayPalConfig> {
    const roundedTotal = parseFloat(totalAmount.toFixed(2));

    return of({
      currency: 'USD',
      clientId: this.clientId,
      createOrderOnClient: (data: any) => ({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: roundedTotal.toString(), 
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: roundedTotal.toString()
              }
            }
          }
        }]
      } as ICreateOrderRequest),
      advanced: { commit: 'true' },
      style: { layout: 'vertical' },
      onApprove: (data, actions) => {
        actions.order.capture().then((details: any) => {
          console.log('✅ Transaction completed:', details);
          
          onPaymentSuccess();
        });
      },
      onError: err => {
        console.error('❌ PayPal Error:', err);
      }
    });
  }
}
