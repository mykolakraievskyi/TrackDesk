import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseClient, Client } from '../../models/client.model';
import { CashDesk } from '../../models/cash-desk.model';
import { MovementService } from '../../../shared/services/client-movement.service';
import { Position } from '../../models/position.model';
import { EClientType } from '../../../types/client.type';

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
    tickets: number,
    cashDeskId: number,
    status: EClientType
  ): Client | null {
    const newClient = new BaseClient(
      id,
      { x: entryPosition.x, y: entryPosition.y },
      tickets,
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
