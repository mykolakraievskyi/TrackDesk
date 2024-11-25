import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logSubject = new Subject<any>();

  addLog(log: any): void {
    this.logSubject.next(log);
  }

  getLogs(): Observable<any> {
    return this.logSubject.asObservable();
  }
}
