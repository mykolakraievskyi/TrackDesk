import { Component, OnInit } from '@angular/core';
import { Client } from '../../features/models/client.model';
import { MovementService } from '../../shared/services/client-movement.service';
import { CommonModule } from '@angular/common';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { Entry } from '../../features/models/entry.model';
import { LogComponent } from '../../shared/components/log/log.component';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { ConfResponse } from '../../features/models/conf-response.model';
import {
  DeskPlace,
  InitService,
} from '../../shared/services/initialization.service';
import { ClientService } from '../../features/components/client/client.service';

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
  deskPlaces: DeskPlace[] = [];
  selectedPlaces: number[] = [];
  requiredPlacesNum: number = 0;
  reserveCashDesk: CashDesk = new BaseCashDesk(
    0,
    { x: 800, y: 20 },
    'cash-desk'
  );
  movementService: MovementService;

  constructor(
    private clientService: ClientService,
    private initService: InitService,
    private entryService: InitService,
    private confService: ConfigurationService
  ) {
    this.movementService = new MovementService();
  }

  ngOnInit(): void {
    this.deskPlaces = this.initService.initializeDeskPlaces();
    this.cashDesks = this.initService.initializeCashDesks();
    this.entries = this.entryService.initializeEntries();
    this.applyConfig();
    this.generateClientsPeriodically();
  }

  generateClientsPeriodically(): void {
    setInterval(() => {
      const newClient = this.clientService.generateClient(
        this.activeEntries,
        this.selectedPlaces,
        this.requiredPlacesNum
      );
      if (newClient) this.clients.push(newClient);
      this.clientService.moveClientsToCashDesks(
        this.clients,
        this.activeCashDesks
      );
    }, 3000);
  }

  applyConfig(): void {
    this.confService.getConfiguration()?.subscribe((response: ConfResponse) => {
      this.requiredPlacesNum = response.cashRegisters.length;
      if (response?.entry?.length > 0) {
        this.activeEntries = response.entry.map(
          index => this.entries[index - 1]
        );
      } else {
        console.warn('No entries available in the response.');
        this.activeEntries = [];
      }
    });
  }

  onPlaceClick(id: number): void {
    if (this.selectedPlaces.length < this.requiredPlacesNum) {
      this.selectedPlaces.push(id);
      this.activateCashDesks();
    }
  }

  activateCashDesks(): void {
    this.selectedPlaces.forEach(id => {
      const desk = this.cashDesks.find(d => d.id === id);
      if (desk && !this.activeCashDesks.includes(desk)) {
        this.activeCashDesks.push(desk);
      }
    });
  }

  getCashPlaceStyle(place: DeskPlace): any {
    return this.initService.getCashPlaceStyle(place);
  }

  getClientStyle(client: Client): any {
    return this.initService.getClientStyle(client);
  }

  getEntryStyle(entry: Entry): any {
    return this.initService.getEntryStyle(entry);
  }

  getCashDeskStyle(cashDesk: CashDesk): any {
    return this.initService.getCashDeskStyle(cashDesk);
  }
}
