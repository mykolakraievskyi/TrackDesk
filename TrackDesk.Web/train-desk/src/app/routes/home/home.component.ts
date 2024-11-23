import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../shared/services/configuration.service';

const ENTRY_EXIT_MIN = 1;
const ENTRY_EXIT_MAX = 8;
const REGISTER_MIN = 2;
const REGISTER_MAX = 9;
const TIME_MIN = 2;
const TIME_MAX = 10;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  entryExitMin = ENTRY_EXIT_MIN;
  entryExitMax = ENTRY_EXIT_MAX;
  registerMin = REGISTER_MIN;
  registerMax = REGISTER_MAX;
  timeMin = TIME_MIN;
  timeMax = TIME_MAX;

  exits: number = 1;
  entrances: number = 1;
  CashRegisters: number = 2;
  secondsStart: number = 2;
  secondsEnd: number = 2;
  timeOption: 'random' | 'static' = 'random';

  onStartClick(): void {
    if (this.validateData()) {
      if (this.timeOption === 'static') {
        this.secondsEnd = this.secondsStart;
      }
      this.configurationService.setConfigurationNumbers({
        cashDesks: this.CashRegisters,
        entrances: this.entrances,
        exits: this.exits,
        secondsStart: this.secondsStart,
        secondsEnd: this.secondsEnd
      });
      this.router.navigate(['station']);
    } else {
      alert('Перегляньте коректність даних та спробуйте, будь ласка, знову)');
    }
  }

  validateData(): boolean {
    let result: boolean = true;
    if (this.exits < this.entryExitMin || this.exits > this.entryExitMax) {
      result = false;
    }
    if (this.entrances < this.entryExitMin || this.entrances > this.entryExitMax) {
      result = false;
    }
    if (
      this.CashRegisters < this.registerMin ||
      this.CashRegisters > this.registerMax
    ) {
      result = false;
    }
    if (this.timeOption === 'static') {
      if (
        this.secondsStart < this.timeMin ||
        this.secondsStart > this.timeMax
      ) {
        result = false;
      }
    } else if (this.timeOption === 'random') {
      if (
        this.secondsStart < this.timeMin ||
        this.secondsStart > this.timeMax
      ) {
        result = false;
      }
      if (this.secondsEnd < this.timeMin || this.secondsEnd > this.timeMax) {
        result = false;
      }
      if (this.secondsStart > this.secondsEnd) {
        result = false;
      }
    }
    return result;
  }
}
