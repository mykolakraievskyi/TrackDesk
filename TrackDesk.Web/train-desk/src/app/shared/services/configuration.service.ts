import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private apiUrl = 'https://'; 

  constructor(private http: HttpClient) {}

  setConfiguration(cashDesks: any[], entrances: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/set`, { cashDesks, entrances });
  }

}
