import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { NewCard, NewCardService } from '../../shared/services/payment-card.service';
import { PayPalService } from '../../shared/services/paypal.service';
import { IPayPalConfig, NgxPayPalModule } from 'ngx-paypal'; 
import { ApplePayModalComponent } from '../../components/apple-pay-modal/apple-pay-modal.component';
import { CreateOrderDto, OrderService, ProductInterface } from '../../shared/services/order.service';
import { AuthService, User } from '../../shared/services/auth.service';

@Component({
  selector: 'fd-checkout',
  imports: [CommonModule, NgxPayPalModule, ApplePayModalComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnInit {
  total = 0;
  paymentMethods: NewCard[] = []; 
  applePay: NewCard = { fullName: 'Apple Pay', icon: 'assets/apple.jpg', selected: false };
  payPal: NewCard = { fullName: 'PayPal', icon: 'assets/paypal.jpg', selected: false };
  selectedCard: NewCard | null = null; 
  payPalConfig?: IPayPalConfig;
  isApplePayVisible = false;
  restaurantAddress = `McDonald's, просп. Свободи, 35, Львів, Україна`; //hardcode, because i haven`t added a restaurantAddress in database
  user: User | null = null;
  products?: ProductInterface[] = [];
  
  constructor(
    private router: Router,
    private paymentService: NewCardService,
    private payPalService: PayPalService,
    private orderService: OrderService,
    private userService: AuthService 
  ) {}

  ngOnInit() {
    this.loadTotal();
    this.loadCards();
    this.initPayPal();
    this.loadProducts();
    this.getUser();
  }

  private loadTotal() {
    this.total = JSON.parse(localStorage.getItem('total') || '0');
  }

  private loadProducts() {
    this.products = JSON.parse(localStorage.getItem('cartItems') || '0');
  }

  private getUser() {
    this.userService.getCachedUser().subscribe(user => {
      this.user = user;
    }); 
  }

  private loadCards() {
    this.paymentService.getCards().subscribe(cards => {
      this.paymentMethods = cards
        .filter(card => card.fullName !== 'Apple Pay' && card.fullName !== 'PayPal')
        .map(card => ({
          ...card,
          icon: this.setCardIcon(card.fullName),
          selected: card.selected ?? false 
        }));

        this.paymentMethods.push(this.applePay, this.payPal);
        this.selectedCard = this.paymentMethods.find(card => card.selected) || this.paymentMethods[0];
    });

    if (this.selectedCard?.fullName === 'PayPal') {
      this.initPayPal();
    }
  }

  private setCardIcon(name: string): string {
    const icons: Record<string, string> = {
      'MasterCard': 'assets/mastercard.jpg',
      'Visa': 'assets/visa.jpg',
      'Apple Pay': 'assets/apple.jpg',
      'PayPal': 'assets/paypal.jpg'
    };
    return icons[name] || 'assets/mastercard.jpg'; 
  }

  selectPaymentMethod(index: number) {
    this.paymentMethods.forEach((method, i) => method.selected = i === index);
    this.selectedCard = this.paymentMethods[index]; 

    if (this.selectedCard.fullName === 'PayPal') {
      this.initPayPal();
    }
  }

  addNewCard() {  
    this.router.navigate([`${RoutingConstants.NEWCARD}`]);
  }

  placeOrder(): void {
    if (!this.user) {
      console.error('❌ User not found');
      return;
    }

    const orderData: CreateOrderDto = {
      products: this.products ?? [],
      totalPrice: this.total,
      deliveryAddress: {
        city: this.user?.deliveryAddress?.city ?? '',
        novaPostDepartment: this.user?.deliveryAddress?.novaPostDepartment ?? ''
      },
      restaurantAddress: this.restaurantAddress,
    };

    this.orderService.createOrder(orderData).subscribe(response => {
      console.log('✅ Order created successfully:', response);
      localStorage.removeItem('cartItems');
      localStorage.removeItem('total');

      this.router.navigate([RoutingConstants.ORDERTRACKING]);

    }, error => {
      console.error('❌ Error creating order:', error);
    });
  }
  
  private initPayPal(): void {
    this.payPalService.getPayPalConfig(this.total, () => this.placeOrder()).subscribe(
      (config: IPayPalConfig) => {
        this.payPalConfig = config;
      },
      (error) => {
        console.error('❌ PayPal config error:', error);
      }
    );
  }

  showApplePayModal() {
    this.isApplePayVisible = true;
  }

  hideApplePayModal() {
    this.isApplePayVisible = false;
  } 
}
