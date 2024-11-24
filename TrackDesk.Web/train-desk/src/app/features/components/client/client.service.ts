import { Injectable } from '@angular/core';
import { BaseClient, Client } from '../../models/client.model';
import { CashDesk } from '../../models/cash-desk.model';
import { MovementService } from '../../../shared/services/client-movement.service';
import { Position } from '../../models/position.model';
import { EClientType } from '../../../types/client.type';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(
    private movementService: MovementService
  ) {}

  generateClient(
    id: number,
    entryPosition: Position,
    cashDeskId: number,
    status: EClientType
  ): Client | null {
    const newClient = new BaseClient(
      id,
      { x: entryPosition.x, y: entryPosition.y },
      status,
      cashDeskId
    );
    return newClient;
  }

  moveClientsToCashDesks(clients: Client[], activeCashDesks: CashDesk[]): void {
    clients.forEach(client => {
      const targetCashDesk = activeCashDesks.filter(
        c => c.id === client.targetCashDeskId
      )[0];
      this.movementService.moveClientToCashDesk(
        client,
        targetCashDesk,
        clients
      );
    });
  }
}
