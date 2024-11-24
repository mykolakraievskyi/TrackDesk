import { TestBed } from '@angular/core/testing';
import { InitService } from './initialization.service';
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('selectPlace', () => {
    it('should set place isSelected to true', () => {
      const place = { id: 1, position: { x: 0, y: 0 }, isSelected: false };
      service.selectPlace(place);

      expect(place.isSelected).toBeTrue();
    });
  });

  describe('generateRandomEntries', () => {
    it('should generate the specified number of random entries', () => {
      const entries = service.generateRandomEntries(3);
      expect(entries.length).toBe(3);
    });
  });

  describe('initializeCashDesks', () => {
    it('should initialize an array of CashDesk objects', () => {
      const cashDesks = service.initializeCashDesks();
      expect(cashDesks.length).toBe(9);
    });
  });

  describe('initializeEntries', () => {
    it('should initialize an array of Entry objects', () => {
      const entries = service.initializeEntries();
      expect(entries.length).toBe(8);
    });
  });

  describe('initializeDeskPlaces', () => {
    it('should initialize an array of DeskPlace objects', () => {
      const deskPlaces = service.initializeDeskPlaces();
      expect(deskPlaces.length).toBe(9);
    });
  });

  describe('getCashPlaceStyle', () => {
    it('should return correct styles when place is selected', () => {
      const place: any = { id: 1, position: { x: 420, y: 40 }, isSelected: true };
      const style = service.getCashPlaceStyle(place);
      expect(style.backgroundColor).toBe('#227CB168');
    });
  });

  describe('getEntryStyle', () => {
    it('should return correct styles for entry-door', () => {
      const entry: Entry = {
        id: 1,
        type: 'entry-door',
        position: { x: 250, y: 580 },
        image: 'entry.jpg',
      };
      const style = service.getEntryStyle(entry);
      expect(style.width).toBe('97px');
    });
  });

  describe('getClientStyle', () => {
    it('should return correct styles for client', () => {
      const client: Client = {
        id: 1,
        type: 'regular', 
        position: { x: 300, y: 400 },
        image: 'client.jpg',
        move: () => {}  // Mock method
      };
      const style = service.getClientStyle(client);
      expect(style.left).toBe('300px');
      expect(style.top).toBe('400px');
      expect(style.backgroundImage).toBe('url(client.jpg)');
    });
  });
});
