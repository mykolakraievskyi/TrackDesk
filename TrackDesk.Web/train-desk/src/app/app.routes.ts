import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { StationComponent } from './routes/station/station.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: StationComponent },
  { path: '**', redirectTo: '' },
];
