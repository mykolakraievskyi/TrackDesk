import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashDeskComponent } from './components/cash-desk/cash-desk.component';
import { LogComponent } from '../shared/components/log/log.component';
import { ClientComponent } from './components/client/client.component';

@NgModule({
  imports: [
    CommonModule,
    CashDeskComponent,
    LogComponent,
    ClientComponent,
    
  ],
  // providers: [CashDeskService, LogService, ClientService, StationService],
  exports: [CashDeskComponent, LogComponent, ClientComponent],
})
export class StationModule {}
