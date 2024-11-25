import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StompService } from './shared/services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'train-desk';

  constructor(private readonly socketService: StompService) {}

  ngOnInit(): void {
    this.socketService.connect("http://localhost:8080/ws");
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
