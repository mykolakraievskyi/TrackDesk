import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigurationService } from './configuration.service';
import { CashDesk } from '../../features/models/cash-desk.model';
import { Entry } from '../../features/models/entry.model';
import { Observable } from 'rxjs';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigurationService],
    });

    service = TestBed.inject(ConfigurationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('setBaseConfiguration', () => {
    it('should set the base configuration correctly', () => {
      service.setBaseConfiguration(5, 2, 3, 10, 20, 5);

      expect(service.cashDeskNumber).toBe(5);
      expect(service.entranceNumber).toBe(2);
      expect(service.exitsNumber).toBe(3);
      expect(service.secondsStart).toBe(10);
      expect(service.secondsEnd).toBe(20);
      expect(service.serveTime).toBe(5);
    });
  });

  describe('configEntiesAndCashDesks', () => {
    it('should set the cash desks and entrances correctly', () => {
      const cashDesks: CashDesk[] = [
        {
          id: 1,
          position: { x: 0, y: 0 },
          image: '',
          type: 'cash-desk',
          clientQueue: [],
          isClosed: false,
          addClient: () => {},
          popClient: () => undefined,
          peekClient: () => null,
          getClientPosition: () => ({ x: 0, y: 0 }),
          getFirstClientPosition: () => ({ x: 0, y: 0 }),
        },
      ];
  
      const entrances: Entry[] = [
        { id: 1, position: { x: 10, y: 10 }, image: 'entrance_image.png', type: 'entry' } // Changed "main" to "entry"
      ];
  
      service.configEntiesAndCashDesks(entrances, cashDesks, cashDesks[0]);
  
      expect(service.cashDesks.length).toBe(1);
      expect(service.entrances.length).toBe(1);
      expect(service.reserveCashDesk).toBe(cashDesks[0]);
    });
  });
  

  describe('setConfiguration', () => {
    it('should make an HTTP POST request to set the configuration', () => {
      const mockResponse = { message: 'Configuration set successfully' };
  
      const cashDesks: CashDesk[] = [
        {
          id: 1,
          position: { x: 0, y: 0 },
          image: '',
          type: 'cash-desk',
          clientQueue: [],
          isClosed: false,
          addClient: () => {},
          popClient: () => undefined,
          peekClient: () => null,
          getClientPosition: () => ({ x: 0, y: 0 }),
          getFirstClientPosition: () => ({ x: 0, y: 0 }),
        },
      ];
      
      const entrances: Entry[] = [
        { id: 1, position: { x: 10, y: 10 }, image: 'entrance_image.png', type: 'entry' } 
      ];
  
      service.configEntiesAndCashDesks(entrances, cashDesks, cashDesks[0]);
      service.setBaseConfiguration(5, 2, 3, 10, 20, 5);
      service.setConfiguration();
  
      const req = httpMock.expectOne('http://127.0.0.1:8080/api/v1/configuration');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.cashDeskDtos.length).toBe(1); 
      expect(req.request.body.entrances.length).toBe(1); 
      req.flush(mockResponse);
  
      service.configuration?.subscribe(response => {
        expect(response.message).toBe('Configuration set successfully');
      });
    });
  });
  

  describe('getConfiguration', () => {
    it('should return the configuration observable', () => {
      service.configuration = new Observable(observer => {
        observer.next({ message: 'Configuration fetched' });
        observer.complete();
      });

      service.getConfiguration()?.subscribe(response => {
        expect(response.message).toBe('Configuration fetched');
      });
    });

    it('should warn if configuration has not been set', () => {
      spyOn(console, 'warn');

      service.configuration = null;
      service.getConfiguration();

      expect(console.warn).toHaveBeenCalledWith('Configuration has not been set.');
    });
  });
});
