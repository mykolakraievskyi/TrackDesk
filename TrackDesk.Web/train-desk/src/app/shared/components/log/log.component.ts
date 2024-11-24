import { Component } from '@angular/core';
import { ILog } from '../../../types/log.types';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  logsArray: ILog[] = [];

  constructor(private);

  addLog(log: ILog) {
    this.logsArray.push(log);
  }
  getTicketHoverText(log: ILog, index: number): string {
    const ticket = log.tickets[index];
    return `Train: ${ticket.train}\nCarriage: ${ticket.carriage}\nDeparture: ${ticket.departureStation} at ${ticket.departureTime}\nArrival: ${ticket.arrivalStation} at ${ticket.arrivalTime}\nPrice: ${ticket.price}`;
  }
}
