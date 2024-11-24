import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { MovementService } from '../../../shared/services/client-movement.service';
import { of } from 'rxjs';
import { BaseClient, Client } from '../../models/client.model';
import { CashDesk } from '../../models/cash-desk.model';
import { Position } from '../../models/position.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  let movementServiceMock: jasmine.SpyObj<MovementService>;

  const apiUrl = 'https://';  // Define the API URL used in the service

  beforeEach(() => {
    movementServiceMock = jasmine.createSpyObj('MovementService', ['moveClientToCashDesk']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import HttpClientTestingModule to mock HttpClient
      providers: [
        ClientService,
        { provide: MovementService, useValue: movementServiceMock }  // Mock MovementService
      ],
    });

    service = TestBed.inject(ClientService);  // Inject ClientService
    httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController to mock requests
  });

  afterEach(() => {
    httpMock.verify();  // Ensure there are no outstanding HTTP requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Ensure the service is created successfully
  });

  describe('getClient', () => {
    it('should fetch a client by ID from the API', () => {
      const mockClient = { id: 1, name: 'John Doe', status: 'regular' };
      const clientId = 1;

      service.getClient(clientId).subscribe((client) => {
        expect(client).toEqual(mockClient);  // Check if the response matches the mock data
      });

      const req = httpMock.expectOne(`${apiUrl}/${clientId}`);  // Expect a GET request to the API URL with client ID
      expect(req.request.method).toBe('GET');  // Check that the request method is GET
      req.flush(mockClient);  // Respond with the mock client data
    });

    it('should handle error when fetching client fails', () => {
      const clientId = 1;
      const errorMessage = 'Client not found';

      service.getClient(clientId).subscribe(
        () => fail('Expected an error, but got success'),
        (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/${clientId}`);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getAllClients', () => {
    it('should fetch all clients from the API', () => {
      const mockClients = [
        { id: 1, name: 'John Doe', status: 'regular' },
        { id: 2, name: 'Jane Smith', status: 'privileged' }
      ];

      service.getAllClients().subscribe((clients) => {
        expect(clients).toEqual(mockClients);  // Check if the response matches the mock data
      });

      const req = httpMock.expectOne(`${apiUrl}`);  // Expect a GET request to the API URL
      expect(req.request.method).toBe('GET');  // Check that the request method is GET
      req.flush(mockClients);  // Respond with the mock clients data
    });

    it('should handle error when fetching all clients fails', () => {
      const errorMessage = 'Failed to fetch clients';

      service.getAllClients().subscribe(
        () => fail('Expected an error, but got success'),
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne(`${apiUrl}`);
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('generateClient', () => {
    it('should generate a new client with given data', () => {
      const entryPosition: Position = { x: 10, y: 20 };
      const cashDeskId = 1;
      const status: 'regular' = 'regular';
  
      const newClient = service.generateClient(1, entryPosition, cashDeskId, status);
  
      // Check that newClient is not null
      expect(newClient).not.toBeNull();
  
      if (newClient) {
        // Check the properties only if newClient is not null
        expect(newClient instanceof BaseClient).toBeTrue();
        expect(newClient.id).toBe(1);
        //expect(newClient.entryPosition).toEqual(entryPosition);
        //expect(newClient.status).toBe(status);
        expect(newClient.targetCashDeskId).toBe(cashDeskId);
      }
    });
  
    it('should return null if no valid data is provided (if applicable)', () => {
      const entryPosition: Position = { x: 10, y: 20 };
      const cashDeskId = 0;  // Invalid cash desk ID
      const status: 'regular' = 'regular';
  
      const newClient = service.generateClient(1, entryPosition, cashDeskId, status);
      expect(newClient).toBeNull();
    });
  });
  
  describe('moveClientsToCashDesks', () => {
    it('should move clients to their respective cash desks', () => {
      const clients: Client[] = [
        new BaseClient(1, { x: 10, y: 20 }, 'regular', 1),
        new BaseClient(2, { x: 30, y: 40 }, 'privileged', 2)
      ];
  
      // Mocking CashDesk with required methods
      const activeCashDesks: CashDesk[] = [
        {
          id: 1,
          position: { x: 100, y: 200 },
          image: 'desk1.png',
          type: 'cash-desk',
          clientQueue: [],
          addClient: jasmine.createSpy('addClient'),
          popClient: jasmine.createSpy('popClient'),
          peekClient: jasmine.createSpy('peekClient'),
          getClientPosition: jasmine.createSpy('getClientPosition').and.returnValue({ x: 100, y: 200 }),
        },
        {
          id: 2,
          position: { x: 300, y: 400 },
          image: 'desk2.png',
          type: 'cash-desk',
          clientQueue: [],
          addClient: jasmine.createSpy('addClient'),
          popClient: jasmine.createSpy('popClient'),
          peekClient: jasmine.createSpy('peekClient'),
          getClientPosition: jasmine.createSpy('getClientPosition').and.returnValue({ x: 300, y: 400 }),
        }
      ];
  
      service.moveClientsToCashDesks(clients, activeCashDesks);
  
      // Ensure moveClientToCashDesk method was called for each client
      expect(movementServiceMock.moveClientToCashDesk).toHaveBeenCalledTimes(2);
      expect(movementServiceMock.moveClientToCashDesk).toHaveBeenCalledWith(clients[0], activeCashDesks[0], clients, activeCashDesks);
      expect(movementServiceMock.moveClientToCashDesk).toHaveBeenCalledWith(clients[1], activeCashDesks[1], clients, activeCashDesks);
    });
  });
  
  
  
});
