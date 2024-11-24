import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './shared/services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'train-desk';

  constructor(private readonly websocketService: WebSocketService) {}

  ngOnInit(): void {
    this.websocketService.connect('http://localhost:8080/ws');
  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
}
