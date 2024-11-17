import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'https://'; 

  constructor(private http: HttpClient) {}

  getClient(clientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clientId}`);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
