import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../../features/models/position.model';

export interface ConfigurationRequest {
  cashDesks: EntityDto[];
  entrances: EntityDto[];
  secondsStart: number;
  secondsEnd: number;
}
interface EntityDto {
  id: number;
  position: Position;
}
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiUrl = 'https://';

  constructor(private http: HttpClient) {}

  configuration: Observable<any> | null = null;

  setConfiguration(
    CashRegisters: number,
    Entry: number,
    Exit: number,
    secondsStart: number,
    secondsEnd: number
  ): Observable<any> {
    return (this.configuration = this.http.post(`http://127.0.0.1:8080/conf`, {
      CashRegisters,
      Entry,
      Exit,
      secondsStart,
      secondsEnd,
    }));
  }

  getConfiguration(): Observable<any> | null {
    if (!this.configuration) {
      console.warn('Configuration has not been set.');
    }
    return this.configuration;
  }
}
