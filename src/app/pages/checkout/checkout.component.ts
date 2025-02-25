import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingConstants } from '../../shared/constants/routing-constants';

@Component({
  selector: 'fd-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  total = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

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

  selectPaymentMethod(index: number) {
    this.paymentMethods.forEach(method => method.selected = false);

    this.paymentMethods[index].selected = true;
  }

  addNewCard() {
    const selectedMethod = this.paymentMethods.find(method => method.selected) || { name: '', icon: '', selected: false };
  
    this.router.navigate([`${RoutingConstants.NEWCARD}`], { 
      queryParams: {
        name: selectedMethod.name,
        icon: selectedMethod.icon,
        selected: selectedMethod.selected
      }
    });
  }
}
