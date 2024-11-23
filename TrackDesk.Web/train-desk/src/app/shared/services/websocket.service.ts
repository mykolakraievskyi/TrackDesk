import { Injectable } from '@angular/core';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private client!: Client;
  private subscriptions: Map<string, StompSubscription> = new Map();

  connect(url: string): void {
    this.client = new Client({
      brokerURL: url,
      webSocketFactory: () => new SockJS(url),
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP Debug:', str),
    });

    this.client.onConnect = () => {
      console.log('STOMP connected');
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.client.activate();
  }

  listen(topic: string): Observable<any> {
    return new Observable((observer) => {
      if (this.subscriptions.has(topic)) {
        console.warn(`Not subscribed to topic: ${topic}`);
        return;
      }

      const subscription = this.client.subscribe(topic, (message: Message) => {
        const data = JSON.parse(message.body);
        observer.next(data);
      });

      this.subscriptions.set(topic, subscription);

      return () => {
        this.unsubscribe(topic);
      };
    });
  }

  emit(destination: string, body: any): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: destination,
        body: JSON.stringify(body),
      });
    } else {
      console.error('STOMP Client is not connected.');
    }
  }

  unsubscribe(topic: string): void {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
    } else {
      console.warn(`No subscription found for topic: ${topic}`);
    }
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.subscriptions.clear();
      console.log('STOMP disconnected');
    }
  }
}
