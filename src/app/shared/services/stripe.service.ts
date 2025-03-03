import { Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplePayService {
  private stripe: Stripe | null = null;

  async initStripe() {
    if (!this.stripe) {
      this.stripe = await loadStripe(environment.stripePublishableKey);
    }
  }

  async generateApplePayQR(): Promise<string | null> {
    await this.initStripe();

    if (!this.stripe) {
      console.error('Stripe is not initialized');
      return null;
    }

    try {
      const total = parseFloat(localStorage.getItem('total') || '0') * 100; 
      if (total <= 0) {
        console.error('❌ Invalid order amount');
        return null;
      }

      const stripePaymentLink = `https://buy.stripe.com/test_14k00FeeOf3Lg5G5kk?amount=${total}`;

      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(stripePaymentLink)}`;

      return qrCodeUrl;
    } catch (error) {
      console.error('❌ Error generating QR code:', error);
      return null;
    }
  }
}
