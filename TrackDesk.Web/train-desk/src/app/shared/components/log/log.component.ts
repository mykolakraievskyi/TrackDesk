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
  logsArray: ILog[] = [
    {
      id: 1,
      clientId: 2,
      clientStatus: true,
      cashDeskId: 4,
      tickets: [
        {
          ticketId: 2,
          train: 'string',
          carriage: 3,
          departureStation: 'asd',
          arrivalStation: 'dfv',
          departureTime: 'asdasd',
          arrivalTime: 'vsdv',
          price: 3,
        },
      ],
      startTime: '123',
      endTime: 'string',
    },
  ];
  getTicketHoverText(log: ILog, index: number): string {
    const ticket = log.tickets[index];
    return `Train: ${ticket.train}\nCarriage: ${ticket.carriage}\nDeparture: ${ticket.departureStation} at ${ticket.departureTime}\nArrival: ${ticket.arrivalStation} at ${ticket.arrivalTime}\nPrice: ${ticket.price}`;
  }
}
