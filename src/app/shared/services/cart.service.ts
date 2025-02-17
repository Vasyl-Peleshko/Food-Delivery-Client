import { Injectable } from '@angular/core';
import { CartItemInterface, FoodItemInterface } from '../interfaces/restaurant-card.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getCart(): CartItemInterface[] {
    const storedCart = localStorage.getItem(this.cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  saveCart(cartItems: CartItemInterface[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  addToCart(item: FoodItemInterface, quantity: number, addon: string | null = null) {
    const cartItems = this.getCart();

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItemInterface = {
        id: item.id,
        name: item.name,
        imgUrl: item.imgUrl,
        price: item.price,
        quantity,
        addon,
        addons: item.addons || [] 
      };

      cartItems.push(newItem);
    }

    this.saveCart(cartItems);
  }

  updateCartItemAddon(itemId: string, addonName: string) {
    let cartItems = this.getCart();

    cartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, addon: item.addon === addonName ? null : addonName } : item
    );

    this.saveCart(cartItems);
  }

  removeFromCart(itemId: string) {
    let cartItems = this.getCart();
    cartItems = cartItems.filter((item) => item.id !== itemId);
    this.saveCart(cartItems);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
}
