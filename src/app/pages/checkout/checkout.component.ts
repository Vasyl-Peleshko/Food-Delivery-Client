import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fd-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  total = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadTotal();
  }

  private loadTotal() {
    this.route.data.subscribe(data => {
      this.total = data['total'];
    });
  }

  paymentMethods = [
    { name: 'MasterCard', icon: 'assets/mastercard.jpg', selected: true },
    { name: 'PayPal', icon: 'assets/paypal.jpg', selected: false },
    { name: 'Apple Pay', icon: 'assets/apple.jpg', selected: false }
  ];
}
