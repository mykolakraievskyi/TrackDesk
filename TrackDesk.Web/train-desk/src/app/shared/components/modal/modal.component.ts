import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input()deskNum: number = 0;


  isOpen: boolean = true;

  public openModal(): void {
    this.isOpen = !this.isOpen;
  }
}
