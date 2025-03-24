import { Component, Input } from '@angular/core';
import { OrderInterface } from '../../shared/services/order.service';

@Component({
  selector: 'fd-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order!: OrderInterface;

  get orderDate(): string {
    return new Date(this.order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  }

  get orderTime(): string {
    return new Date(this.order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  get totalItems(): number {
    return this.order.products.reduce((sum: number, product) => sum + product.quantity, 0);
  }
}
