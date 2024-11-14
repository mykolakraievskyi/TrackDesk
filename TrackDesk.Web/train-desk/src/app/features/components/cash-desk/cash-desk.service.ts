import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CashDeskService {
  private apiUrl = 'https://'; 

  constructor(private http: HttpClient) {}

  getCashDesks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  updateCashDeskStatus(cashDeskId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/status`, { cashDeskId, status });
  }
}
