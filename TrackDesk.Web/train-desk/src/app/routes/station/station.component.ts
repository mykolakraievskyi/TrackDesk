import { Component, OnInit } from '@angular/core';
import { BaseClient, Client } from '../../features/models/client.model';
import { MovementService } from '../../shared/services/client-movement.service';
import { CommonModule } from '@angular/common';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { BaseEntry, Entry } from '../../features/models/entry.model';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  clients: Client[] = [];
  cashDesks: CashDesk[] = [];
  entry: Entry[] = [];
  movementService: MovementService;

  constructor() {
    this.movementService = new MovementService();
  }

  ngOnInit(): void {
    this.initializeCashDesks();
    this.initializeEntries();

    this.generateClientsPeriodically();
  }

  generateClientsPeriodically(): void {
    setInterval(() => {
      this.generateClient();
      this.moveClientsToCashDesks(); 
    }, 3000); 
  }

  generateClient(): void {
    const clientTypes: ('regular' | 'privileged')[] = ['regular', 'privileged'];
    const randomType: 'regular' | 'privileged' =
      clientTypes[Math.floor(Math.random() * clientTypes.length)];

    const xCoordinates = [10, 20, 30];
    const randomX =
      xCoordinates[Math.floor(Math.random() * xCoordinates.length)];

    const newClient = new BaseClient(
      Math.floor(Math.random() * 1000), 
      { x: randomX, y: 0 },
      randomType 
    );

    this.clients.push(newClient);
    console.log(
      `Generated client: ${newClient.id}, type: ${newClient.type}, position: (${newClient.position.x}, ${newClient.position.y})`
    );
  }

  initializeCashDesks(): void {
    this.cashDesks.push(new BaseCashDesk(1, { x: 300, y: 200 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(1, { x: 400, y: 200 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(1, { x: 500, y: 200 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(1, { x: 600, y: 200 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(1, { x: 300, y: 400 }, 'ticket-box'));
    this.cashDesks.push(new BaseCashDesk(2, { x: 400, y: 250 }, 'ticket-box'));
  }

  initializeEntries(): void {
    this.entry.push(new BaseEntry(1, { x: 0, y: 0 }, 'entry-door'));
    this.entry.push(new BaseEntry(1, { x: 0, y: 0 }, 'entry-door'));
    this.entry.push(new BaseEntry(1, { x: 0, y: 0 }, 'entry-door'));
    this.entry.push(new BaseEntry(1, { x: 0, y: 0 }, 'entry-door'));
    this.entry.push(new BaseEntry(1, { x: 0, y: 0 }, 'entry-door'));
  }

  moveClientsToCashDesks(): void {
    this.clients.forEach((client, index) => {
      const targetCashDesk = this.cashDesks[index % this.cashDesks.length];
      console.log(
        `Starting to move client ${client.id} to cash desk ${targetCashDesk.id}`
      );
      this.movementService.moveClientToCashDesk(client, targetCashDesk);
    });
  }

  getClientStyle(client: Client): any {
    return {
      position: 'absolute',
      left: `${client.position.x}px`,
      top: `${client.position.y}px`,
      width: '50px',
      height: '50px',
      backgroundImage: `url(${client.image})`,
      backgroundSize: 'cover',
    };
  }

  getCashDeskStyle(cashDesk: CashDesk): any {
    return {
      position: 'absolute',
      left: `${cashDesk.position.x}px`,
      top: `${cashDesk.position.y}px`,
      width: '60px',
      height: '60px',
      backgroundImage: `url(${cashDesk.image})`,
      backgroundSize: 'cover',
    };
  }
}
