import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  private messages$: Subject<any> = new Subject();

  connect(url: string): void {
    try {
      this.socket = new WebSocket(url);
    } catch (error) {
      console.error(error);
    }

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      this.messages$.next(data);
    };

    this.socket.onerror = event => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = event => {
      console.log('WebSocket closed:', event);
    };
  }

  emit(eventName: string, data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ event: eventName, data });
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open.');
    }
  }

  listen(eventName: string): Observable<any> {
    return new Observable(observer => {
      const subscription = this.messages$.subscribe(message => {
        if (message.event === eventName) {
          observer.next(message.data);
        }
      });

      return () => subscription.unsubscribe();
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
