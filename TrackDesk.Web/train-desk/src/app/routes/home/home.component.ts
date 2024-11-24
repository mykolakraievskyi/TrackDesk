import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../shared/services/configuration.service';


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

ENTRANCE_EXIT_MIN = 1;
ENTRANCE_EXIT_MAX = 8;
REGISTER_MIN = 2;
REGISTER_MAX = 9;
TIME_MIN = 2;
TIME_MAX = 10;



  exits: number = 1;
  entrances: number = 1;
  cashRegisters: number = 2;
  secondsStart: number = 2;
  secondsEnd: number = 2;
  serveTime: number = 5;
  timeOption: 'random' | 'static' = 'random';

  onStartClick(): void {
    if (this.validateData()) {
      if (this.timeOption === 'static') {
        this.secondsEnd = this.secondsStart;
      }
      this.configurationService.setBaseConfiguration(
        this.cashRegisters,
        this.entrances,
        this.exits,
        this.secondsStart,
        this.secondsEnd,
        this.serveTime
      );
      this.router.navigate(['station']);
    } else {
      alert('Перегляньте коректність даних та спробуйте, будь ласка, знову)');
    }
  }

  validateData(): boolean {
    let result: boolean = true;
    if (
      this.exits < this.ENTRANCE_EXIT_MIN ||
      this.exits > this.ENTRANCE_EXIT_MAX
    ) {
      result = false;
    }
    if (
      this.entrances < this.ENTRANCE_EXIT_MIN ||
      this.entrances > this.ENTRANCE_EXIT_MAX
    ) {
      result = false;
    }
    if (
      this.cashRegisters < this.REGISTER_MIN ||
      this.cashRegisters > this.REGISTER_MAX
    ) {
      result = false;
    }
    if (this.timeOption === 'static') {
      if (
        this.secondsStart < this.TIME_MIN ||
        this.secondsStart > this.TIME_MAX
      ) {
        result = false;
      }
    } else if (this.timeOption === 'random') {
      if (
        this.secondsStart < this.TIME_MIN ||
        this.secondsStart > this.TIME_MAX
      ) {
        result = false;
      }
      if (this.secondsEnd < this.TIME_MIN || this.secondsEnd > this.TIME_MAX) {
        result = false;
      }
      if(this.serveTime < this.TIME_MIN || this.serveTime > this.TIME_MAX){
        result = false;
      }
      if (this.secondsStart > this.secondsEnd) {
        result = false;
      }
    }
    return result;
  }
}
