import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: Stomp.Client | null = null;
  private connected: boolean = false;

  connect(): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(
      {},
      frame => {
        console.log('Connected: ', frame);

        this.subscribe('/station/1/open/message', message => {
          console.log('Received message: ', message);
        });
      },
      error => {
        console.error('Error connecting: ', error);
      }
    );
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
        this.connected = false;
      });
    }
  }

  subscribe(topic: string, callback: (message: string) => void): void {
    if (this.stompClient && this.connected) {
      this.stompClient.subscribe(topic, message => {
        callback(message.body);
      });
    }
  }

  send(destination: string, body: any): void {
    if (this.stompClient && this.connected) {
      this.stompClient.send(destination, {}, JSON.stringify(body));
      console.log('Message sent:', body);
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}
