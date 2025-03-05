import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderInterface, OrderService } from '../../shared/services/order.service';
import { OrderCardComponent } from '../../components/order-card/order-card.component';

@Component({
  selector: 'fd-orders-history',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.scss'
})
export class OrdersHistoryComponent implements OnInit {
  orders: OrderInterface[] = [];
  filteredOrders: OrderInterface[] = [];
  activeTab: 'upcoming' | 'history' = 'upcoming';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.filterOrders();
    });
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => 
      this.activeTab === 'upcoming' ? order.status === 'pending' : order.status === 'delivered'
    );
  }

  setActiveTab(tab: 'upcoming' | 'history'): void {
    this.activeTab = tab;
    this.filterOrders();
  }
}
