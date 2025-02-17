import { Component, DoCheck, OnInit } from '@angular/core';
import { CartItemInterface } from '../../shared/interfaces/restaurant-card.interface';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../../shared/cart-item/cart-item.component';

@Component({
  selector: 'fd-cart-items',
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent implements OnInit, DoCheck {
  cartItems: CartItemInterface[] = [];

  subtotal?: number = 0;
  tax?: number = 0;
  delivery?: number = 1.33;
  total?: number = 0;

  constructor(private cartService: CartService) {}

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
    this.loadCart();
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }

  handleAddonUpdate(event: { itemId: string; addonName: string }) {
    this.cartService.updateCartItemAddon(event.itemId, event.addonName);
    this.loadCart(); 
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
  
    this.tax = this.subtotal * 0.10; //податок урааа(ні)
    this.total = this.subtotal + this.tax + this.delivery!;
  }
}
