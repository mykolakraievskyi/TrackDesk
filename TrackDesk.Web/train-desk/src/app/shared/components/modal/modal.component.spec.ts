import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the ModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default deskNum of 0', () => {
    expect(component.deskNum).toBe(0);
  });

  it('should toggle the isOpen property when openModal is called', () => {
    expect(component.isOpen).toBeTrue();

    component.openModal();
    expect(component.isOpen).toBeFalse();

    component.openModal();
    expect(component.isOpen).toBeTrue();
  });

  it('should correctly bind deskNum input property', () => {
    component.deskNum = 5;
    fixture.detectChanges(); 

    const deskNumElement = fixture.debugElement.query(By.css('.desk-num'));
    expect(deskNumElement.nativeElement.textContent).toContain('5');
  });

  it('should render modal content when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges(); 

    const modalElement = fixture.debugElement.query(By.css('.modal')); 
    expect(modalElement).toBeTruthy();
  });

  it('should hide modal content when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges(); 

    const modalElement = fixture.debugElement.query(By.css('.modal')); 
    expect(modalElement).toBeFalsy();
  });

});
