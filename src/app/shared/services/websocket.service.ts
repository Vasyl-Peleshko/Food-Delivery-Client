import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CourierUpdate {
  event: string;
  orderId: string;
  location: {
    lat: number;
    lng: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;

  constructor() {
    this.connectToWebSocket();
  }

  private connectToWebSocket() {
    this.socket = new WebSocket(environment.webSocketApiUrl);

    this.socket.onopen = () => {
      console.log('✅ WebSocket connected to ws/');
    };

    this.socket.onclose = () => {
      console.warn('❌ WebSocket disconnected');
      setTimeout(() => this.connectToWebSocket(), 3000);
    };
  }

  listenToCourierUpdates(): Observable<CourierUpdate> {
    return new Observable(observer => {
      this.socket.onmessage = (event) => {
        const data: CourierUpdate = JSON.parse(event.data);
        if (data.event === 'orderUpdate') {
          console.log(`📩 New courier location received: Lat ${data.location.lat}, Lng ${data.location.lng}`);
          observer.next(data);
        }
      };
    });
  }
}
