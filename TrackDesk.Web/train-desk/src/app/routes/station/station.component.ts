import { Component, OnInit } from '@angular/core';
import { BaseClient, Client } from '../../features/models/client.model';
import {  MovementService } from '../../shared/services/client-movement.service';
import { CommonModule } from '@angular/common';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';

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
  movementService: MovementService;

  constructor() {
    this.movementService = new MovementService();
  }

  ngOnInit(): void {
    this.clients.push(new BaseClient(1, { x: 0, y: 0 }, 'regular'));
    this.clients.push(new BaseClient(1, { x: 20, y: 0 }, 'regular'));
    this.clients.push(new BaseClient(1, { x: 50, y: 0 }, 'regular'));
    this.clients.push(new BaseClient(2, { x: 30, y: 10 }, 'privileged'));

    this.cashDesks.push(new BaseCashDesk(1, { x: 300, y: 200 }, 'cash-desk'));
    this.cashDesks.push(new BaseCashDesk(2, { x: 400, y: 250 }, 'cash-desk'));

    this.moveClientsToCashDesks();
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
