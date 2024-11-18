import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let configurationServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock ConfigurationService
    configurationServiceMock = {
      setConfiguration: jasmine
        .createSpy('setConfiguration')
        .and.returnValue(of(true)),
    };

    // Mock Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent, // Standalone component
        FormsModule, // FormsModule is required for ngModel usage
      ],
      providers: [
        { provide: ConfigurationService, useValue: configurationServiceMock },
        provideRouter([{ path: 'station', component: HomeComponent }]),
        provideHttpClient(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('validateData', () => {
    it('should return true for valid data', () => {
      component.Entry = 2;
      component.Exit = 2;
      component.CashRegisters = 3;
      component.secondsStart = 3;
      component.secondsEnd = 5;
      component.timeOption = 'random';

      expect(component.validateData()).toBeTrue();
    });

    it('should return false if Entry is out of range', () => {
      component.Entry = 0; // Out of range
      expect(component.validateData()).toBeFalse();
    });

    it('should return false if Exit is out of range', () => {
      component.Exit = 9; // Out of range
      expect(component.validateData()).toBeFalse();
    });

    it('should return false if CashRegisters is out of range', () => {
      component.CashRegisters = 1; // Out of range
      expect(component.validateData()).toBeFalse();
    });

    it('should return false if secondsStart is out of range in static mode', () => {
      component.timeOption = 'static';
      component.secondsStart = 1; // Out of range
      expect(component.validateData()).toBeFalse();
    });

    it('should return false if secondsEnd is out of range in random mode', () => {
      component.timeOption = 'random';
      component.secondsEnd = 11; // Out of range
      expect(component.validateData()).toBeFalse();
    });

    it('should return false if secondsStart is greater than secondsEnd in random mode', () => {
      component.timeOption = 'random';
      component.secondsStart = 6;
      component.secondsEnd = 5;
      expect(component.validateData()).toBeFalse();
    });
  });

  describe('onStartClick', () => {
    it('should navigate to station if data is valid', () => {
      spyOn(component, 'validateData').and.returnValue(true);
      component.onStartClick();

      expect(configurationServiceMock.setConfiguration).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['station']);
    });

    it('should set secondsEnd to secondsStart if timeOption is static', () => {
      component.timeOption = 'static';
      component.secondsStart = 5;
      spyOn(component, 'validateData').and.returnValue(true);

      component.onStartClick();

      expect(component.secondsEnd).toBe(5);
    });

    it('should show alert if data is invalid', () => {
      spyOn(component, 'validateData').and.returnValue(false);
      spyOn(window, 'alert');

      component.onStartClick();

      expect(configurationServiceMock.setConfiguration).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(
        'Перегляньте коректність даних та спробуйте, будь ласка, знову)'
      );
    });

    it('should log an error if configurationService returns an error', () => {
      spyOn(component, 'validateData').and.returnValue(true);
      configurationServiceMock.setConfiguration.and.returnValue(
        throwError(() => new Error('Service error'))
      );
      spyOn(console, 'error');

      component.onStartClick();

      expect(console.error).toHaveBeenCalledWith(
        'Помилка:',
        jasmine.any(Error)
      );
    });
  });
});
