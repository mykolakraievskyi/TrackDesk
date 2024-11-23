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
export interface ConfigurationNumbers {
  cashDesks: number;
  entrances: number;
  exits?: number;
  secondsStart: number;
  secondsEnd: number;
}
@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiUrl = 'https://';
  private desiredNumbers: ConfigurationNumbers;

  constructor(private http: HttpClient) {
    this.desiredNumbers = {
      cashDesks: 0,
      entrances: 0,
      exits: 0,
      secondsStart: 0,
      secondsEnd: 0,
    };
  }

  configuration: Observable<any> | null = null;

  setConfigurationNumbers(confNumbers: ConfigurationNumbers): void {
    this.desiredNumbers = confNumbers;
  }
  getConfigurationNumbers(): ConfigurationNumbers {
    return this.desiredNumbers;
  }
  setConfiguration(
    configurationRequest: ConfigurationRequest
  ): Observable<any> {
    console.log(configurationRequest);
    return (this.configuration = this.http.post(
      `http://127.0.0.1:8080/conf`,
      configurationRequest
    ));
  }

  getConfiguration(): Observable<any> | null {
    if (!this.configuration) {
      console.warn('Configuration has not been set.');
    }
    return this.configuration;
  }
}
