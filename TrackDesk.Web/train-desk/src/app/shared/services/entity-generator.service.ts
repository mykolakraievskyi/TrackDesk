import { Injectable } from '@angular/core';
import { CashDesk } from '../../features/models/cash-desk.model';
import { BaseCashDesk } from '../../features/models/cash-desk.model';
import { Entry } from '../../features/models/entry.model';
import { BaseEntry } from '../../features/models/entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntityGeneratorService {
  cashDesks: CashDesk[];
  entrances: Entry[];
  activeCashDesks: CashDesk[] = [];
  activeEntrances: Entry[] = [];
  constructor() {
    this.cashDesks = [
      new BaseCashDesk(1, { x: 360, y: 20 }, 'cash-desk'),
      new BaseCashDesk(2, { x: 470, y: 20 }, 'cash-desk'),
      new BaseCashDesk(3, { x: 700, y: 400 }, 'cash-desk'),
      new BaseCashDesk(4, { x: 810, y: 400 }, 'cash-desk'),
      new BaseCashDesk(5, { x: 920, y: 400 }, 'cash-desk'),
      new BaseCashDesk(6, { x: 600, y: 200 }, 'ticket-box'),
      new BaseCashDesk(7, { x: 680, y: 200 }, 'ticket-box'),
      new BaseCashDesk(8, { x: 220, y: 310 }, 'ticket-box'),
      new BaseCashDesk(9, { x: 310, y: 310 }, 'ticket-box'),
    ];

    this.entrances = [
      new BaseEntry(1, { x: 250, y: 580 }, 'entry-door'),
      new BaseEntry(2, { x: 410, y: 580 }, 'entry-door'),
      new BaseEntry(3, { x: 590, y: 580 }, 'entry-door'),
      new BaseEntry(4, { x: 770, y: 580 }, 'entry-door'),
      new BaseEntry(5, { x: 940, y: 580 }, 'entry-door'),
      new BaseEntry(6, { x: 1170, y: 300 }, 'entry'),
      new BaseEntry(7, { x: 1170, y: 410 }, 'entry'),
      new BaseEntry(8, { x: 1170, y: 520 }, 'entry'),
    ];
  }

  getAllCashDesks(): CashDesk[] {
    return this.cashDesks;
  }

  getAllEntrances(): Entry[] {
    return this.entrances;
  }

  configure(cashDesksNumber: number, entrancesNumber: number): void {
    if (this.activeCashDesks.length > 0 || this.activeEntrances.length > 0) {
      throw new Error('App is already configured');
    }

    if (
      cashDesksNumber > this.cashDesks.length ||
      entrancesNumber > this.entrances.length
    ) {
      throw new Error('Requested number exceeds available entities');
    }

    this.activeCashDesks = this.getRandomItems(this.cashDesks, cashDesksNumber);
    this.activeEntrances = this.getRandomItems(this.entrances, entrancesNumber);
  }

  private getRandomItems<T>(items: T[], count: number): T[] {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
