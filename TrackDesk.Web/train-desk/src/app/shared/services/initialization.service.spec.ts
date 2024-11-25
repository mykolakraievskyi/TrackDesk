import { TestBed } from '@angular/core/testing';
import { InitService, DeskPlace } from './initialization.service';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { BaseEntry, Entry } from '../../features/models/entry.model';
import { Client } from '../../features/models/client.model';

describe('InitService', () => {
  let service: InitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitService],
    });
    service = TestBed.inject(InitService);
  });

  // Test for service creation
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test selectPlace method
  describe('selectPlace', () => {
    it('should mark the place as selected', () => {
      const place: DeskPlace = { id: 1, position: { x: 10, y: 10 } };
      service.selectPlace(place);
      expect(place.isSelected).toBeTrue();
    });
  });

  // Test initializeCashDesks method
  describe('initializeCashDesks', () => {
    it('should return an array of CashDesk objects', () => {
      const desks = service.initializeCashDesks();
      expect(desks.length).toBe(9);
      expect(desks[0]).toBeInstanceOf(BaseCashDesk);
    });
  });

  // Test initializeEntries method
  describe('initializeEntries', () => {
    it('should return an array of Entry objects', () => {
      const entries = service.initializeEntries();
      expect(entries.length).toBe(8);
      expect(entries[0]).toBeInstanceOf(BaseEntry);
    });
  });

  // Test generateRandomEntries method
  describe('generateRandomEntries', () => {
    it('should return the specified number of random entries', () => {
      const amount = 3;
      const entries = service.generateRandomEntries(amount);
      expect(entries.length).toBe(amount);
    });

    it('should not return more entries than available', () => {
      const allEntries = service.initializeEntries();
      const entries = service.generateRandomEntries(allEntries.length + 5);
      expect(entries.length).toBe(allEntries.length);
    });
  });

  // Test getCashPlaceStyle method
  describe('getCashPlaceStyle', () => {
    it('should return styles for a DeskPlace', () => {
      const place: DeskPlace = { id: 1, position: { x: 100, y: 100 }, isSelected: false };
      const styles = service.getCashPlaceStyle(place);
      expect(styles.left).toBe('100px');
      expect(styles.top).toBe('100px');
      expect(styles.backgroundColor).toBe('#C3D3DD68');
    });

    it('should apply selected style if DeskPlace is selected', () => {
      const place: DeskPlace = { id: 2, position: { x: 200, y: 200 }, isSelected: true };
      const styles = service.getCashPlaceStyle(place);
      expect(styles.backgroundColor).toBe('#227CB168');
    });
  });

  // Test getClientStyle method
  /*describe('getClientStyle', () => {
    it('should return styles for a Client', () => {
      const client: Client = { id: 1, position: { x: 50, y: 50 }, image: 'client.png', type: 'regular', tickets: [] };
      const styles = service.getClientStyle(client);
      expect(styles.left).toBe('50px');
      expect(styles.top).toBe('50px');
      expect(styles.backgroundImage).toContain('client.png');
    });
  });*/

  // Test getEntryStyle method
  describe('getEntryStyle', () => {
    it('should return styles for an entry door', () => {
      const entry: Entry = { id: 1, position: { x: 10, y: 10 }, image: 'entry.png', type: 'entry-door' };
      const styles = service.getEntryStyle(entry);
      expect(styles.width).toBe('97px');
      expect(styles.height).toBe('97px');
      expect(styles.backgroundImage).toContain('entry.png');
    });

    it('should return styles for a regular entry', () => {
      const entry: Entry = { id: 2, position: { x: 20, y: 20 }, image: 'entry.png', type: 'entry' };
      const styles = service.getEntryStyle(entry);
      expect(styles.width).toBe('52px');
      expect(styles.height).toBe('80px');
    });
  });

  // Test getCashDeskStyle method
  /*describe('getCashDeskStyle', () => {
    it('should return styles for a CashDesk', () => {
      const cashDesk: CashDesk = { id: 1, position: { x: 100, y: 100 }, image: 'desk.png', type: 'cash-desk', isClosed: false };
      const styles = service.getCashDeskStyle(cashDesk);
      expect(styles.left).toBe('100px');
      expect(styles.top).toBe('100px');
      expect(styles.width).toBe('110px');
      expect(styles.height).toBe('110px');
      expect(styles.backgroundImage).toContain('desk.png');
    });

    it('should apply grayscale filter for closed CashDesk', () => {
      const cashDesk: CashDesk = { id: 1, position: { x: 100, y: 100 }, image: 'desk.png', type: 'cash-desk', isClosed: true };
      const styles = service.getCashDeskStyle(cashDesk);
      expect(styles.filter).toBe('grayscale(100%)');
    });
  });*/
});
