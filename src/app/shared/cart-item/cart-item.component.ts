import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItemInterface } from '../interfaces/restaurant-card.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fd-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartItemInterface;
  @Output() itemUpdated = new EventEmitter<void>();
  @Output() itemRemoved = new EventEmitter<string>();
  @Output() addonUpdated = new EventEmitter<{ itemId: string; addonName: string }>(); 
  selectedAddon: string | null = null;  

  ngOnInit(): void {
    this.selectedAddon = this.item.addon || null;
  }

  decreaseQuantity() {
    if (this.item.quantity > 1) { 
      this.item.quantity--;
      this.itemUpdated.emit();
    }
  }

  increaseQuantity() {
    this.item.quantity++;
    this.itemUpdated.emit();
  }

  removeItem() {
    this.itemRemoved.emit(this.item.id);
  }

  handleAddonClick(addonName: string) {
    this.selectedAddon = this.selectedAddon === addonName ? null : addonName;
    this.item.addon = this.selectedAddon;     

    this.addonUpdated.emit({ itemId: this.item.id, addonName: this.item.addon || '' });
  }
  
}
