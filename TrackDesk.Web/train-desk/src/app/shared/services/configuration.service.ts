import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../../features/models/entry.model';
import { CashDesk } from '../../features/models/cash-desk.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiUrl = 'https://';

  constructor(private http: HttpClient) {}

  configuration: Observable<any> | null = null;
  cashDeskNumber!: number;
  cashDesks!: CashDesk[];
  reserveCashDesk!: CashDesk;
  entranceNumber!: number;
  entrances!: Entry[];
  exitsNumber!: number;
  secondsStart!: number;
  secondsEnd?: number;
  serveTime!: number

  setBaseConfiguration(
    cashRegisters: number,
    entrances: number,
    exits: number,
    secondsStart: number,
    secondsEnd: number,
    serveTime: number
  ): void {
    this.cashDeskNumber = cashRegisters;
    this.entranceNumber = entrances;
    this.exitsNumber = exits;
    this.secondsStart = secondsStart;
    this.secondsEnd = secondsEnd;
    this.serveTime = serveTime
  }

  configEntiesAndCashDesks(entries: Entry[], cashDesk: CashDesk[], reserveCashDesk: CashDesk): void {
    this.cashDesks = cashDesk;
    this.entrances = entries;
    this.reserveCashDesk = reserveCashDesk;
  }

  setConfiguration(): void {
    const formattedCashDesks = this.cashDesks.map(c => ({
      id: c.id,
      position: c.position,
    }));

    const formatedEntries = this.entrances.map(e => ({
      id: e.id,
      position: e.position,
    }));

    this.configuration = this.http.post(
      `http://127.0.0.1:8080/api/v1/configuration`,
      {
        cashDeskDtos: formattedCashDesks,
        reserveCashDeskDto: this.reserveCashDesk,
        entrances: formatedEntries,
        secondsStart: this.secondsStart,
        secondsEnd: this.secondsEnd,
      }
    );
    this.configuration.subscribe(response => {
      if (response) {
        console.log('Configuration set successfully:', response);
      } else {
        console.error('Failed to set configuration.');
      }
    });
  }

  getConfiguration(): Observable<any> | null {
    if (!this.configuration) {
      console.warn('Configuration has not been set.');
    }
    return this.configuration;
  }
}
