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
  constructor(private router: Router, private configurationService: ConfigurationService) {}

  Exit = "";
  Entry = "";
  CashRegisters = "";
  secondsStart = "";
  secondsEnd = "";
  timeOption = "random";


  onStartClick() {
    if(this.validateData() === true){
    if(this.timeOption === "random"){
      this.configurationService.setConfiguration(+this.CashRegisters, +this.Entry, +this.Exit, +this.secondsStart, +this.secondsEnd).subscribe({
        next: (response) => console.log('Запит успішний:', response),
        error: (error) => console.error('Помилка:', error),
      });
    } else if(this.timeOption === "static"){
        this.configurationService.setConfiguration(+this.CashRegisters, +this.Entry, +this.Exit, +this.secondsStart, +this.secondsStart).subscribe({
          next: (response) => console.log('Запит успішний:', response),
          error: (error) => console.error('Помилка:', error),
        });
      }
    this.router.navigate(['station']);
    }
  }

  validateData(): boolean{
    if(+this.Exit < 2 || +this.Exit>9){
      return false;
    }
    if(+this.Entry < 2 || +this.Entry>9){
      return false;
    }
    if(+this.CashRegisters < 1 || +this.CashRegisters > 11){
      return false;
    }
    if(this.timeOption === "static"){
      if(+this.secondsStart < 2 || +this.secondsStart > 10){
        return false
      }
    }else if(this.timeOption === "random"){
      if(+this.secondsStart < 2 || +this.secondsStart > 10){
        return false
      }
      if(+this.secondsEnd < 2 || +this.secondsEnd > 10){
        return false
      }
      if(+this.secondsStart > +this.secondsEnd){
        return false;
      }
    }
    return true;
  }
}
