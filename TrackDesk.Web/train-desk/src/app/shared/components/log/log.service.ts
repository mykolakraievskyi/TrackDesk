import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private apiUrl = 'https://';

  constructor(private http: HttpClient) {}

  logEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/log`, eventData);
  }

  getLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
