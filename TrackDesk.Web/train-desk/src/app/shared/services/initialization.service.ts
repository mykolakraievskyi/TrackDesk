import { Injectable } from '@angular/core';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { BaseEntry, Entry } from '../../features/models/entry.model';
import { Position } from '../../features/models/position.model';
import { Client } from '../../features/models/client.model';

export interface DeskPlace {
  id: number;
  position: Position;
  isSelected?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private selectedPlace: DeskPlace | null = null;

  selectPlace(place: DeskPlace): void {
    place.isSelected = true;
  }

  generateRandomEntries(amount: number): Entry[] {
    const allEntries = this.initializeEntries();
    const result: Entry[] = [];

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * allEntries.length);
      result.push(allEntries[randomIndex]);
      allEntries.splice(randomIndex, 1);
    }

    return result;
  }

  initializeCashDesks(): CashDesk[] {
    return [
      new BaseCashDesk(1, { x: 420, y: 20 }, 'cash-desk'),
      new BaseCashDesk(2, { x: 520, y: 20 }, 'cash-desk'),
      new BaseCashDesk(3, { x: 700, y: 400 }, 'cash-desk'),
      new BaseCashDesk(4, { x: 810, y: 400 }, 'cash-desk'),
      new BaseCashDesk(5, { x: 920, y: 400 }, 'cash-desk'),
      new BaseCashDesk(6, { x: 600, y: 200 }, 'ticket-box'),
      new BaseCashDesk(7, { x: 680, y: 200 }, 'ticket-box'),
      new BaseCashDesk(8, { x: 220, y: 310 }, 'ticket-box'),
      new BaseCashDesk(9, { x: 310, y: 310 }, 'ticket-box'),
    ];
  }

  initializeEntries(): Entry[] {
    return [
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

  initializeDeskPlaces(): DeskPlace[] {
    return [
      { id: 1, position: { x: 420, y: 40 } },
      { id: 2, position: { x: 520, y: 40 } },
      { id: 3, position: { x: 700, y: 400 } },
      { id: 4, position: { x: 810, y: 400 } },
      { id: 5, position: { x: 920, y: 400 } },
      { id: 6, position: { x: 600, y: 200 } },
      { id: 7, position: { x: 700, y: 200 } },
      { id: 8, position: { x: 220, y: 310 } },
      { id: 9, position: { x: 310, y: 310 } },
    ];
  }

  getCashPlaceStyle(place: DeskPlace): any {
    return {
      position: 'absolute',
      left: `${place.position.x}px`,
      top: `${place.position.y}px`,
      width: '80px',
      height: '80px',
      backgroundColor: place.isSelected ? '#227CB168' : '#C3D3DD68',
      cursor: 'pointer',
      border: '3px dashed #00000098',
      borderRadius: '10px',
      zIndex: 10,
    };
  }

  getClientStyle(client: Client): any {
    return {
      position: 'absolute',
      left: `${client.position.x}px`,
      top: `${client.position.y}px`,
      width: '60px',
      height: '60px',
      backgroundImage: `url(${client.image})`,
      backgroundSize: 'cover',
      zIndex: (client.id+5).toString(),
    };
  }

  getEntryStyle(entry: Entry): any {
    const isDoor = entry.type === 'entry-door';

    return {
      position: 'absolute',
      left: `${entry.position.x}px`,
      top: `${entry.position.y}px`,
      width: isDoor ? '97px' : '52px',
      height: isDoor ? '97px' : '80px',
      backgroundImage: `url(${entry.image})`,
      backgroundSize: 'cover',
    };
  }

  getCashDeskStyle(cashDesk: CashDesk): any {
    const isTicketBox = cashDesk.type === 'ticket-box';

    const styles: any = {
      position: 'absolute',
      left: `${cashDesk.position.x}px`,
      top: `${cashDesk.position.y}px`,
      width: isTicketBox ? '85px' : '110px',
      height: isTicketBox ? '85px' : '110px',
      backgroundImage: `url(${cashDesk.image})`,
      cursor: 'pointer',
      zIndex: '2',
      backgroundSize: 'cover',
    };

    if (cashDesk.isClosed) {
      styles.filter = 'grayscale(100%)';
    }

    return styles;
  }
}
