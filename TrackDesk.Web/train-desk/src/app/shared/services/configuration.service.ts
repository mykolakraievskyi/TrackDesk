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

  configuration:Observable<any>|null = null;
  CashRegisters!: number;
  CashDesks!: CashDesk[];
  Entry!: number;
  Entries!: Entry[];
  Exit!: number;
  secondsStart!: number;
  secondsEnd?: number;

  setBaseConfiguration(
    CashRegisters: number,
    Entry: number,
    Exit: number,
    secondsStart: number,
    secondsEnd: number
  ):void{
    this.CashRegisters = CashRegisters;
    this.Entry = Entry;
    this.Exit = Exit;
    this.secondsStart = secondsStart;
    this.secondsEnd = secondsEnd;
  }

  configEntiesAndCashDesks(entries: Entry[], cashDesk: CashDesk[]): void{
    console.log(cashDesk);
    this.CashDesks = cashDesk;
    this.Entries = entries;
  }


  setConfiguration(): void {
    const formattedCashDesks = this.CashDesks.map(c => ({
      id: c.id,
      position: c.position
    }));

    const formatedEntries = this.Entries.map(e => ({
      id: e.id,
      position: e.position
    }));

    console.log(formattedCashDesks);


    this.configuration = this.http.post(`http://127.0.0.1:8080/api/v1/configuration`, {
      cashDeskDtos: formattedCashDesks,
      entrances: formatedEntries,
      secondsStart:this.secondsStart,
      secondsEnd:this.secondsEnd,
    });
    this.configuration.subscribe((response) => {
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
