import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../features/models/client.model';
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
import { CloseCashDeskRequest } from '../../shared/DTOs/dtos';

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
  confService = inject(ConfigurationService);
  private clientService = inject(ClientService);
  private initService = inject(InitService);
  private socketService = inject(StompService);
  currentClosedCashDeskId: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initData();
    if (!this.confService.cashDeskNumber) {
      this.router.navigate(['home']);
    }
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribe('/station/standardUser/client/generate');
    this.socketService.disconnect();
  }

  initData(): void {
    this.deskPlaces = this.initService.initializeDeskPlaces();
    this.cashDesks = this.initService.initializeCashDesks();
    this.activeEntries = this.initService.generateRandomEntries(
      this.confService.entranceNumber
    );
  }
  initSubscriptions(): void {
    this.socketService
      .listen('/station/standardUser/close/message')
      .subscribe((data: CloseCashDeskRequest) => {
        const cashDeskToClose = this.activeCashDesks.filter(
          x => x.id === data.cashDeskId
        )[0];
        if (data.closed) {
          if (this.currentClosedCashDeskId === -1) {
            this.clientService.relocateClients(
              cashDeskToClose,
              this.reserveCashDesk,
              this.clients,
              this.cashDesks
            );
          } else {
            const cashDeskToOpen = this.activeCashDesks.filter(
              x => x.id === this.currentClosedCashDeskId
            )[0];
            this.clientService.relocateClients(
              this.reserveCashDesk,
              cashDeskToOpen,
              this.clients,
              this.cashDesks
            );
            this.clientService.relocateClients(
              cashDeskToClose,
              this.reserveCashDesk,
              this.clients,
              this.cashDesks
            );
          }
          this.currentClosedCashDeskId = cashDeskToClose.id;
        }
      });

    this.socketService
      .listen('/station/standardUser/client/generate')
      .subscribe(data => {
        const entryPosition = this.activeEntries.filter(
          e => e.id === data.entranceId
        )[0].position;
        const newClient = this.clientService.generateClient(
          data.id,
          entryPosition,
          data.cashDeskId,
          data.clientStatus
        );
        if (newClient) this.clients.push(newClient);
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
