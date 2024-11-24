/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationComponent } from './station.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogComponent } from '../../shared/components/log/log.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { InitService } from '../../shared/services/initialization.service';
import { MovementService } from '../../shared/services/client-movement.service';
import { StompService } from '../../shared/services/websocket.service';
import { ClientService } from '../../features/components/client/client.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

// Mock services
class MockInitService {
  initializeDeskPlaces() {
    return [{ id: 1, name: 'Desk 1' }, { id: 2, name: 'Desk 2' }];
  }

  initializeCashDesks() {
    return [{ id: 1, name: 'Cash Desk 1' }, { id: 2, name: 'Cash Desk 2' }];
  }

  generateRandomEntries(entranceNumber: number) {
    return [{ id: 1, position: { x: 10, y: 20 } }];
  }

  getCashPlaceStyle() {
    return {};
  }

  getClientStyle() {
    return {};
  }

  getEntryStyle() {
    return {};
  }

  getCashDeskStyle() {
    return {};
  }

  selectPlace() {}
}

class MockConfigurationService {
  cashDeskNumber = 2;
  entranceNumber = 2;
  setConfiguration() {}
  configEntiesAndCashDesks() {}
}

class MockStompService {
  listen() {
    return of({ entranceId: 1, cashDeskId: 1, clientStatus: 'active', id: 1 });
  }

  unsubscribe() {}
  disconnect() {}
}

class MockClientService {
  generateClient(id: number, position: any, cashDeskId: number, clientStatus: string) {
    return { id, position, cashDeskId, clientStatus };
  }

  moveClientsToCashDesks() {}
}

class MockMovementService {}

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, LogComponent, ModalComponent, RouterModule],
      declarations: [StationComponent],
      providers: [
        { provide: InitService, useClass: MockInitService },
        { provide: ConfigurationService, useClass: MockConfigurationService },
        { provide: StompService, useClass: MockStompService },
        { provide: ClientService, useClass: MockClientService },
        { provide: MovementService, useClass: MockMovementService },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges(); // trigger initial change detection
  });

  it('should create the StationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize desk places and cash desks on ngOnInit', () => {
    expect(component.deskPlaces.length).toBeGreaterThan(0);
    expect(component.cashDesks.length).toBeGreaterThan(0);
  });

  /*it('should navigate to home if cashDeskNumber is not defined in ConfigurationService', () => {
    const configService = TestBed.inject(ConfigurationService);
    configService.cashDeskNumber = undefined; // Simulate missing value
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should add a new client when generateClientsPeriodically is called', () => {
    const initialClientCount = component.clients.length;
    component.generateClientsPeriodically();
    expect(component.clients.length).toBeGreaterThan(initialClientCount);
  });

  it('should handle selecting a place correctly', () => {
    const initialSelectedPlaces = component.selectedPlaces.length;
    component.onPlaceClick(1); // Simulate selecting place with id 1
    expect(component.selectedPlaces.length).toBeGreaterThan(initialSelectedPlaces);
  });

});
*/
