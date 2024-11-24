import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogComponent } from './log.component';
import { By } from '@angular/platform-browser';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logsArray with two entries initially', () => {
    expect(component.logsArray.length).toBe(2);
    expect(component.logsArray[0].name).toBe('Oleh');
    expect(component.logsArray[1].name).toBe('Nastya');
  });

  it('should display the correct logs in the template', () => {
    const logElements = fixture.debugElement.queryAll(By.css('.log-entry'));
    
    expect(logElements.length).toBe(2);
    expect(logElements[0].nativeElement.textContent).toContain('Oleh');
    expect(logElements[0].nativeElement.textContent).toContain('gay');
    expect(logElements[1].nativeElement.textContent).toContain('Nastya');
    expect(logElements[1].nativeElement.textContent).toContain('adult');
  });

 it('should handle adding a new log correctly', () => {
    component.logsArray.push({ name: 'Ivan', description: 'new log' });
    fixture.detectChanges();

    const logElements = fixture.debugElement.queryAll(By.css('.log-entry'));
    expect(logElements.length).toBe(3);
    expect(logElements[2].nativeElement.textContent).toContain('Ivan');
    expect(logElements[2].nativeElement.textContent).toContain('new log');
  });
});
