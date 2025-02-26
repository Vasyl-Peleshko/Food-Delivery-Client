import { Component, DoCheck, OnInit } from '@angular/core';
import { CartItemInterface } from '../../shared/interfaces/restaurant-card.interface';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../shared/constants/routing-constants';

@Component({
  selector: 'fd-shopping-carts',
  imports: [CommonModule, CartItemComponent],
  templateUrl: './shopping-carts.component.html',
  styleUrl: './shopping-carts.scss'
})
export class ShoppingCartsComponent implements OnInit, DoCheck {
  cartItems: CartItemInterface[] = [];

  subtotal = 0;
  tax = 0;
  delivery = 1.33;
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
    this.calculateTotals();
  }

  ngDoCheck() {
    this.calculateTotals();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  updateCart() {
    this.cartService.saveCart(this.cartItems);
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }

  handleAddonUpdate(event: { itemId: string; addonName: string }) {
    this.cartService.updateCartItemAddon(event.itemId, event.addonName);
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => {
      let itemTotal = item.price * item.quantity;
  
      if (item.addon) {
        const selectedAddon = item.addons?.find(a => a.name === item.addon);
        if (selectedAddon) {
          itemTotal += selectedAddon.price * item.quantity; 
        }
      }
  
      return sum + itemTotal;
    }, 0);
  
    this.tax = this.subtotal * 0.10;
    this.total = this.subtotal + this.tax + this.delivery!;

    localStorage.setItem('total', JSON.stringify(this.total));
  }

  goToCheckout() {
    this.router.navigate([`${RoutingConstants.CHECKOUT}`]);
  }
}
