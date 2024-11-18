import { Component, OnInit } from '@angular/core';
import { BaseClient, Client } from '../../features/models/client.model';
import { MovementService } from '../../shared/services/client-movement.service';
import { CommonModule } from '@angular/common';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { BaseEntry, Entry } from '../../features/models/entry.model';
import { LogComponent } from '../../shared/components/log/log.component';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { ConfResponse } from '../../features/models/conf-response.model';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [CommonModule, LogComponent],
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit {
  clients: Client[] = [];
  cashDesks: CashDesk[] = [];
  entries: Entry[] = [];
  activeEntries: Entry[] = [];
  activeCashDesks: CashDesk[] = [];
  reserveCashDesk: CashDesk = new BaseCashDesk(
    0,
    { x: 800, y: 20 },
    'cash-desk'
  );
  movementService: MovementService;

  constructor(private confService: ConfigurationService) {
    this.movementService = new MovementService();
  }

  ngOnInit(): void {
    this.initializeCashDesks();
    this.initializeEntries();
    this.applyConfig();
    this.generateClientsPeriodically();
  }

  generateClientsPeriodically(): void {
    setInterval(() => {
      this.generateClient();
      this.moveClientsToCashDesks();
    }, 3000);
  }

  applyConfig(): void {
    this.confService.getConfiguration()?.subscribe((response: ConfResponse) => {
      this.activeCashDesks = response.cashRegisters.map(
        index => this.cashDesks[index - 1]
      );
      this.activeEntries = response.entry.map(index => this.entries[index - 1]);
    });
  }

  generateClient(): void {
    const clientTypes: ('regular' | 'privileged')[] = ['regular', 'privileged'];
    const randomType: 'regular' | 'privileged' =
      clientTypes[Math.floor(Math.random() * clientTypes.length)];

    const randomEntry =
      this.activeEntries[Math.floor(Math.random() * this.activeEntries.length)];

    const newClient = new BaseClient(
      Math.floor(Math.random() * 1000),
      { x: randomEntry.position.x, y: randomEntry.position.y },
      randomType
    );

    this.clients.push(newClient);
  }

  initializeCashDesks(): void {
    //this.cashDesks.push(new BaseCashDesk(0, { x: 800, y: 20 }, 'cash-desk')); //reserve cash-desk
    this.cashDesks.push(new BaseCashDesk(1, { x: 360, y: 20 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(2, { x: 470, y: 20 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(3, { x: 700, y: 400 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(4, { x: 810, y: 400 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(5, { x: 920, y: 400 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(6, { x: 600, y: 200 }, 'ticket-box'));
    this.cashDesks.push(new BaseCashDesk(7, { x: 680, y: 200 }, 'ticket-box'));
    this.cashDesks.push(new BaseCashDesk(8, { x: 220, y: 310 }, 'ticket-box'));
    this.cashDesks.push(new BaseCashDesk(9, { x: 310, y: 310 }, 'ticket-box'));
  }

  initializeEntries(): void {
    this.entries.push(new BaseEntry(1, { x: 250, y: 580 }, 'entry-door'));
    this.entries.push(new BaseEntry(2, { x: 410, y: 580 }, 'entry-door'));
    this.entries.push(new BaseEntry(3, { x: 590, y: 580 }, 'entry-door'));
    this.entries.push(new BaseEntry(4, { x: 770, y: 580 }, 'entry-door'));
    this.entries.push(new BaseEntry(5, { x: 940, y: 580 }, 'entry-door'));
    this.entries.push(new BaseEntry(6, { x: 1170, y: 300 }, 'entry'));
    this.entries.push(new BaseEntry(7, { x: 1170, y: 410 }, 'entry'));
    this.entries.push(new BaseEntry(8, { x: 1170, y: 520 }, 'entry'));
  }

  moveClientsToCashDesks(): void {
    this.clients.forEach((client, index) => {
      const targetCashDesk =
        this.activeCashDesks[index % this.activeCashDesks.length];
      this.movementService.moveClientToCashDesk(
        client,
        targetCashDesk,
        this.clients,
        this.activeCashDesks
      );
    });
  }

  getClientStyle(client: Client): any {
    return {
      position: 'absolute',
      left: `${client.position.x}px`,
      top: `${client.position.y}px`,
      width: '60px',
      height: '60px',
      backgroundImage: `url(${client.image})`,
      backgroundSize: 'cover',
      zIndex: 1,
    };
  }

  getEntryStyle(entry: Entry): any {
    const isDoor = entry.type === 'entry-door';

    return {
      position: 'absolute',
      left: `${entry.position.x}px`,
      top: `${entry.position.y}px`,
      width: isDoor ? '97px' : '52px',
      height: isDoor ? '97px' : '80px',
      backgroundImage: `url(${entry.image})`,
      backgroundSize: 'cover',
    };
  }

  getCashDeskStyle(cashDesk: CashDesk): any {
    const isTicketBox = cashDesk.type === 'ticket-box';

    return {
      position: 'absolute',
      left: `${cashDesk.position.x}px`,
      top: `${cashDesk.position.y}px`,
      width: isTicketBox ? '85px' : '110px',
      height: isTicketBox ? '85px' : '110px',
      backgroundImage: `url(${cashDesk.image})`,
      backgroundSize: 'cover',
    };
  }
}
