import { TestBed } from '@angular/core/testing';
import { EntityGeneratorService } from './entity-generator.service';
import { BaseCashDesk, CashDesk } from '../../features/models/cash-desk.model';
import { BaseEntry, Entry } from '../../features/models/entry.model';

describe('EntityGeneratorService', () => {
  let service: EntityGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityGeneratorService],
    });

    service = TestBed.inject(EntityGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize cashDesks and entrances correctly', () => {
    expect(service.getAllCashDesks().length).toBe(9);
    expect(service.getAllEntrances().length).toBe(8);
  });

  it('should configure activeCashDesks and activeEntrances correctly', () => {
    service.configure(3, 2);
    
    expect(service.activeCashDesks.length).toBe(3);
    expect(service.activeEntrances.length).toBe(2);
  });

  it('should throw an error if app is already configured', () => {
    service.configure(3, 2);
    
    expect(() => {
      service.configure(2, 2);
    }).toThrowError('App is already configured');
  });

  it('should throw an error if requested number exceeds available entities', () => {
    expect(() => {
      service.configure(10, 2);  
    }).toThrowError('Requested number exceeds available entities');

    expect(() => {
      service.configure(3, 10);  
    }).toThrowError('Requested number exceeds available entities');
  });

  it('should select random items from cashDesks and entrances', () => {
    const cashDesksBefore = [...service.getAllCashDesks()];
    const entrancesBefore = [...service.getAllEntrances()];

    const randomCashDesks = service['getRandomItems'](cashDesksBefore, 3);
    const randomEntrances = service['getRandomItems'](entrancesBefore, 2);

    expect(randomCashDesks.length).toBe(3);
    expect(randomEntrances.length).toBe(2);

    expect(randomCashDesks).not.toEqual(cashDesksBefore.slice(0, 3));
    expect(randomEntrances).not.toEqual(entrancesBefore.slice(0, 2));
  });

  it('should throw an error if configure is called with zero values', () => {
    expect(() => {
      service.configure(0, 0);  
    }).toThrowError('Requested number exceeds available entities');
  });
});
