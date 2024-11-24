import { TestBed } from '@angular/core/testing';
import { MovementService } from './client-movement.service';
import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';
import { StaticObstacle } from '../../features/models/obstacle.model';

describe('MovementService', () => {
  let service: MovementService;

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

  const mockClients: Client[] = [
    { 
      id: 1, 
      position: { x: 0, y: 0 }, 
      targetCashDeskId: undefined,
      image: 'client-image.png',  // Add image
      type: 'regular',            // Add type
      move: jasmine.createSpy('move') // Add move method as spy
    },
    { 
      id: 2, 
      position: { x: 0, y: 0 }, 
      targetCashDeskId: undefined,
      image: 'client-image-2.png',
      type: 'privileged',
      move: jasmine.createSpy('move') 
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementService],
    });
    service = TestBed.inject(MovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly assign a client to the cash desk with the fewest clients', () => {
    const client = mockClients[0];
    const cashDeskWithFewestClients = service.findCashDeskWithFewestClients(mockCashDesks, mockClients);
    expect(cashDeskWithFewestClients).toBe(mockCashDesks[0]); // Since both have 0 clients, should return the first one
  });

  it('should assign client to the best cash desk and move to it', () => {
    const client = mockClients[0];
    const bestDesk = mockCashDesks[0];
    spyOn(service, 'moveClientToCashDesk');

    service.assignClientToBestCashDesk(client, mockCashDesks, mockClients, mockClients, mockCashDesks);
    
    expect(service.moveClientToCashDesk).toHaveBeenCalledWith(client, bestDesk, mockClients, mockCashDesks);
  });

  it('should move client to cash desk and update position', () => {
    const client = mockClients[0];
    const cashDesk = mockCashDesks[0];
    spyOn(cashDesk, 'getClientPosition').and.returnValue({ x: 10, y: 20 });
    spyOn(service, 'serveClient');
    
    service.moveClientToCashDesk(client, cashDesk, mockClients, mockCashDesks);
    
    expect(client.position).toEqual({ x: 10, y: 20 + 32 });  // Assuming QUEUE_OFFSET = 32
    expect(service.serveClient).toHaveBeenCalledWith(client, cashDesk);
  });

  it('should handle client movement when there are obstacles', () => {
    const client = mockClients[0];
    const cashDesk = mockCashDesks[0];
  
    // Modify staticObstacles to make it writable in the test
    Object.defineProperty(service, 'staticObstacles', {
      writable: true,
      value: [
        new StaticObstacle(
          { x: 0, y: 0 },
          { x: 50, y: 50 },
          { x: 0, y: 0 },
          { x: 50, y: 50 }
        )
      ]
    });
  
    const newPosition = service.correctPosition(client.position, { x: 10, y: 10 });
  
    expect(newPosition.x).toBeGreaterThanOrEqual(50); // Should be corrected based on obstacle
    expect(newPosition.y).toBeGreaterThanOrEqual(50); // Should be corrected based on obstacle
  });
  
  it('should serve the client when it reaches the cash desk', () => {
    const client = mockClients[0];
    const cashDesk = mockCashDesks[0];
    service.serveClient(client, cashDesk);
    
    expect(cashDesk.addClient).toHaveBeenCalledWith(client);
  });
});
