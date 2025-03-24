/* eslint-disable @typescript-eslint/no-explicit-any */
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
        try {
          const data: any = JSON.parse(event.data);

          if (data) {
            console.log(data);
            
            observer.next(data);
          } else {
            console.warn("⚠️ Unrecognized message format:", data);
          }
        } catch (error) {
          console.error("❌ Error parsing message:", error);
        }
      };
    });
  }  
}
