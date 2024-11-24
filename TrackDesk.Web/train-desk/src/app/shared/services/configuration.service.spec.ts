import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigurationService } from './configuration.service';
import { CashDesk } from '../../features/models/cash-desk.model';
import { Entry } from '../../features/models/entry.model';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let httpMock: HttpTestingController;

  const mockCashDesks: CashDesk[] = [
    {
      id: 1,
      position: { x: 10, y: 20 },
      image: 'cash-desk.png',
      type: 'cash-desk',
      clientQueue: [],
      addClient: jasmine.createSpy('addClient'),
      popClient: jasmine.createSpy('popClient'),
      peekClient: jasmine.createSpy('peekClient'),
      getClientPosition: jasmine.createSpy('getClientPosition').and.returnValue({ x: 10, y: 20 }),
    },
    {
      id: 2,
      position: { x: 30, y: 40 },
      image: 'cash-desk-2.png',
      type: 'cash-desk',
      clientQueue: [],
      addClient: jasmine.createSpy('addClient'),
      popClient: jasmine.createSpy('popClient'),
      peekClient: jasmine.createSpy('peekClient'),
      getClientPosition: jasmine.createSpy('getClientPosition').and.returnValue({ x: 30, y: 40 }),
    }
  ];
  
  const mockEntries: Entry[] = [
    {
      id: 1,
      position: { x: 50, y: 60 },
      image: 'entry.png',
      type: 'entry-door',
    },
    {
      id: 2,
      position: { x: 70, y: 80 },
      image: 'entry-2.png',
      type: 'entry-door',
    }
  ];
  

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set base configuration correctly', () => {
    service.setBaseConfiguration(5, 3, 2, 10, 20);

    expect(service.cashDeskNumber).toBe(5);
    expect(service.entranceNumber).toBe(3);
    expect(service.exitsNumber).toBe(2);
    expect(service.secondsStart).toBe(10);
    expect(service.secondsEnd).toBe(20);
  });

  it('should set cash desks and entries correctly', () => {
    service.configEntiesAndCashDesks(mockEntries, mockCashDesks);

    expect(service.cashDesks).toEqual(mockCashDesks);
    expect(service.entrances).toEqual(mockEntries);
  });

  it('should call the API and set the configuration correctly', () => {
    service.configEntiesAndCashDesks(mockEntries, mockCashDesks);
    service.setBaseConfiguration(5, 3, 2, 10, 20);

    const expectedPayload = {
      cashDeskDtos: [
        { id: 1, position: { x: 10, y: 20 } },
        { id: 2, position: { x: 30, y: 40 } },
      ],
      entrances: [
        { id: 1, position: { x: 50, y: 60 } },
        { id: 2, position: { x: 70, y: 80 } },
      ],
      secondsStart: 10,
      secondsEnd: 20,
    };

    service.setConfiguration();

    const req = httpMock.expectOne('http://127.0.0.1:8080/api/v1/configuration');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedPayload);

    req.flush({ success: true });
    spyOn(console, 'log');
    expect(console.log).toHaveBeenCalledWith('Configuration set successfully:', { success: true });
  });

  it('should handle error correctly when API call fails', () => {
    service.configEntiesAndCashDesks(mockEntries, mockCashDesks);
    service.setBaseConfiguration(5, 3, 2, 10, 20);

    service.setConfiguration();

    const req = httpMock.expectOne('http://127.0.0.1:8080/api/v1/configuration');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    spyOn(console, 'error');
    expect(console.error).toHaveBeenCalledWith('Failed to set configuration.');
  });

  it('should return configuration observable when requested', () => {
    service.configEntiesAndCashDesks(mockEntries, mockCashDesks);
    service.setBaseConfiguration(5, 3, 2, 10, 20);
    service.setConfiguration();

    const config$ = service.getConfiguration();
    expect(config$).toBeTruthy();
  });

  it('should warn when configuration is not set and getConfiguration is called', () => {
    spyOn(console, 'warn');
    service.getConfiguration();
    expect(console.warn).toHaveBeenCalledWith('Configuration has not been set.');
  });
});
