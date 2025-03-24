/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../shared/services/websocket.service';
import { AuthService, User } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../shared/constants/routing-constants';

@Component({
  selector: 'fd-order-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent implements OnInit {
  map!: google.maps.Map;
  courierMarker!: google.maps.Marker;
  userMarker!: google.maps.Marker;
  polyline!: google.maps.Polyline;
  deliveryAddress = 'Loading...';
  loading = true;

  defaultCenter = { lat: 49.8397, lng: 24.0297 };

  order = {
    id: 'DKS-501F9',
    distance: 15,
    status: [
      { label: 'Order confirmed', time: '12:30 PM', completed: true },
      { label: 'Preparing Food', time: '12:40 PM', completed: true },
      { label: 'Food on the way', time: '12:42 PM', completed: true },
      { label: 'Delivered to you', time: '02:50 PM', completed: false },
    ],
    courier: {
      name: 'Farion Wick',
      phone: '+1 234 567 890'
    }
  };

  constructor(
    private webSocketService: WebSocketService, 
    private userService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: User) => {
      this.deliveryAddress = user.deliveryAddress?.city
        ? `${user.deliveryAddress.city}, ${user.deliveryAddress.novaPostDepartment || user.deliveryAddress.street || ''}`
        : 'No delivery address provided';
  
      this.loadGoogleMaps(() => this.initializeMap());
      this.loading = false;
    });
  
    this.subscribeToCourierUpdates();
  }
  
  private subscribeToCourierUpdates(): void {
    let lastLocation: { lat: number, lng: number } = { lat: 0, lng: 0 }; 
  
    this.webSocketService.listenToCourierUpdates().subscribe((data: any) => {
      console.log("📩 Received WebSocket message:", data);
  
      if (data?.status === "delivered") {
        this.updateOrderStatus("Delivered to you");

        setTimeout(() => {
          this.router.navigate([RoutingConstants.MYORDERS]);
        }, 5000);

        return;
      }
  
      if (data?.event === "orderUpdate" && data?.location) {
        if (data.location.lat !== lastLocation.lat || data.location.lng !== lastLocation.lng) {
          lastLocation = { lat: data.location.lat, lng: data.location.lng };
          this.updateCourierLocation(data.location.lat, data.location.lng);
          console.log(`📍 Courier moving to: Lat ${data.location.lat}, Lng ${data.location.lng}`);
        }
      }
    });
  
    setInterval(() => {
      if (lastLocation.lat !== 0 && lastLocation.lng !== 0) {
        console.log(`🕒 Last known courier location: Lat ${lastLocation.lat}, Lng ${lastLocation.lng}`);
      }
    }, 5000);
  }  
  
  updateOrderStatus(statusLabel: string): void {
    const statusIndex = this.order.status.findIndex(status => status.label === statusLabel);
    if (statusIndex !== -1) {
      this.order.status[statusIndex].completed = true;
    }
  }

  loadGoogleMaps(callback: () => void) {
    if (typeof google !== 'undefined') {
      callback();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBdPICCwf5UyCnA-u_ovfdI1UW6z1rnRAQ&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      center: this.defaultCenter,
      zoom: 12,
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.userMarker = new google.maps.Marker({
      position: this.defaultCenter,
      map: this.map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      title: 'Delivery Address'
    });

    this.courierMarker = new google.maps.Marker({
      position: this.defaultCenter,
      map: this.map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      title: 'Courier'
    });

    this.polyline = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: '#FF5733',
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: this.map
    });
  }

  updateCourierLocation(lat: number, lng: number) {
    if (this.courierMarker) {
      this.courierMarker.setPosition({ lat, lng });

      const path = this.polyline?.getPath();
      path?.push(new google.maps.LatLng(lat, lng));
    }
  }
}
