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
    this.CashDesks = cashDesk;
    this.Entries = entries;
  }


  setConfiguration(): Observable<any> {
    return this.configuration = this.http.post(`http://127.0.0.1:8080/conf`, {
      CashRegisters:this.CashRegisters,
      Entry:this.Entry,
      Exit:this.Exit,
      secondsStart:this.secondsStart,
      secondsEnd:this.secondsEnd,
    });
  }
  
  getConfiguration(): Observable<any> | null {
    if (!this.configuration) {
      console.warn('Configuration has not been set.');
    }
    return this.configuration;
  }



}
