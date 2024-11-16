import { Routes } from '@angular/router';
import { StationComponent } from './routes/station/station.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'station', component: StationComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
