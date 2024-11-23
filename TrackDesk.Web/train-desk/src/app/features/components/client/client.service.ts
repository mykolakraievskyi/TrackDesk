import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../../models/entry.model';
import { BaseClient, Client } from '../../models/client.model';
import { CashDesk } from '../../models/cash-desk.model';
import { MovementService } from '../../../shared/services/client-movement.service';

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
    activeEntries: Entry[],
    selectedPlaces: number[],
    requiredPlacesNum: number
  ): Client | null {
    if (selectedPlaces.length !== requiredPlacesNum) return null;

    const clientTypes: ('regular' | 'privileged')[] = ['regular', 'privileged'];
    const randomType: 'regular' | 'privileged' =
      clientTypes[Math.floor(Math.random() * clientTypes.length)];

    const randomEntry =
      activeEntries[Math.floor(Math.random() * activeEntries.length)];

    const newClient = new BaseClient(
      Math.floor(Math.random() * 1000),
      { x: randomEntry.position.x, y: randomEntry.position.y },
      randomType
    );

    return newClient;
  }

  moveClientsToCashDesks(clients: Client[], activeCashDesks: CashDesk[]): void {
    clients.forEach((client, index) => {
      const targetCashDesk = activeCashDesks[index % activeCashDesks.length];
      this.movementService.moveClientToCashDesk(
        client,
        targetCashDesk,
        clients,
        activeCashDesks
      );
    });
  }
}
