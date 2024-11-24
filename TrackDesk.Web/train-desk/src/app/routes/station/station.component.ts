import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../features/models/client.model';
import { MovementService } from '../../shared/services/client-movement.service';
import { CommonModule } from '@angular/common';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { Entry } from '../../features/models/entry.model';
import { LogComponent } from '../../shared/components/log/log.component';
import { ConfigurationService } from '../../shared/services/configuration.service';
import {
  DeskPlace,
  InitService,
} from '../../shared/services/initialization.service';
import { ClientService } from '../../features/components/client/client.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { Router, RouterModule } from '@angular/router';
import { StompService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [CommonModule, LogComponent, ModalComponent, RouterModule],
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss'],
})
export class StationComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  cashDesks: CashDesk[] = [];
  activeEntries: Entry[] = [];
  activeCashDesks: CashDesk[] = [];
  deskPlaces: DeskPlace[] = [];
  selectedPlaces: number[] = [];
  reserveCashDesk: CashDesk = new BaseCashDesk(
    0,
    { x: 800, y: 20 },
    'cash-desk'
  );
  movementService = inject(MovementService);
  confService = inject(ConfigurationService);
  private clientService = inject(ClientService);
  private initService = inject(InitService);
  private socketService = inject(StompService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.deskPlaces = this.initService.initializeDeskPlaces();
    this.cashDesks = this.initService.initializeCashDesks();
    if (!this.confService.cashDeskNumber) {
      this.router.navigate(['home']);
    }
    this.activeEntries = this.initService.generateRandomEntries(
      this.confService.entranceNumber
    );
    this.generateClientsPeriodically();
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribe('/station/standardUser/client/generate');
    this.socketService.disconnect();
  }

  generateClientsPeriodically(): void {
    this.socketService
      .listen('/station/standardUser/client/generate')
      .subscribe(data => {
        const entryPosition = this.activeEntries.filter(
          e => e.id === data.entranceId
        )[0].position;
        console.log(data);
        const newClient = this.clientService.generateClient(
          data.id,
          entryPosition,
          data.cashDeskId,
          data.clientStatus
        );
        if (newClient) this.clients.push(newClient);
        console.log(newClient);
        this.clientService.moveClientsToCashDesks(
          this.clients,
          this.activeCashDesks
        );
      });
  }

  onPlaceClick(id: number): void {
    if (this.selectedPlaces.length < this.confService.cashDeskNumber) {
      this.selectedPlaces.push(id);
      this.activateCashDesks();
      this.selectPlace(this.deskPlaces[id - 1]);
    }
    if (this.selectedPlaces.length === this.confService.cashDeskNumber) {
      this.confService.configEntiesAndCashDesks(
        this.activeEntries,
        this.activeCashDesks
      );
      this.movementService.initializeCashDeskPositions(this.activeCashDesks);
      this.confService.setConfiguration();
    }
  }

  selectPlace(place: DeskPlace): void {
    if (!place.isSelected) {
      this.initService.selectPlace(place);
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
