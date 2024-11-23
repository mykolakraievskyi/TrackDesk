import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseClient, Client } from '../../models/client.model';
import { CashDesk } from '../../models/cash-desk.model';
import { MovementService } from '../../../shared/services/client-movement.service';
import { Position } from '../../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'https://';

  constructor(
    private http: HttpClient,
    private movementService: MovementService
  ) {}

  getClient(clientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clientId}`);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  generateClient(
    id: number,
    entryPosition: Position,
    cashDeskId: number,
    status: 'regular' | 'privileged'
  ): Client | null {
    return new BaseClient(id, entryPosition, status, cashDeskId);
  }

  moveClientsToCashDesks(clients: Client[], activeCashDesks: CashDesk[]): void {
    clients.forEach(client => {
      const targetCashDesk = activeCashDesks.filter(
        c => c.id === client.targetCashDeskId
      )[0];
      this.movementService.moveClientToCashDesk(
        client,
        targetCashDesk,
        clients,
        activeCashDesks
      );
    });
  }

  relocateClients(
    currentCashDesk: CashDesk,
    newCashDesk: CashDesk,
    clients: Client[],
    cashDesks: CashDesk[]
  ): void {
    this.movementService.relocateClients(
      currentCashDesk,
      newCashDesk,
      clients,
      cashDesks
    );
  }
}
