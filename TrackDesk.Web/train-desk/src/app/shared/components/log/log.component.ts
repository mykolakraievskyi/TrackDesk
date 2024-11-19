import { Component } from '@angular/core';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {

   logsArray = [
    {
      name: 'Oleh',
      status: 'Gey',
    },
    {
      name: 'Nastya',
      status: 'adult',
    }
  ];

}
