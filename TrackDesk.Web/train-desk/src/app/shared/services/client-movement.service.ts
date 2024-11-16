import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CashDeskService } from '../../features/components/cash-desk/cash-desk.service';
import { ClientService } from '../../features/components/client/client.service';
import { Position } from '../../features/models/position.model';

@Injectable({
  providedIn: 'root',
})
export class ClientMovementService {
  constructor(
    private cashDeskService: CashDeskService,
    private clientService: ClientService
  ) {}

  private calculateDistance(position1: Position, position2: Position): number {
    return Math.sqrt(
      Math.pow(position2.x - position1.x, 2) +
        Math.pow(position2.y - position1.y, 2)
    );
  }

  calculateRoute(
    clientPosition: Position,
    cashDeskPosition: Position
  ): Position[] {
    const route: Position[] = [];
    route.push(clientPosition);

    const xDiff = cashDeskPosition.x - clientPosition.x;
    const yDiff = cashDeskPosition.y - clientPosition.y;

    if (xDiff !== 0) {
      route.push({
        x: clientPosition.x + (xDiff > 0 ? 1 : -1),
        y: clientPosition.y,
      });
    }
    if (yDiff !== 0) {
      route.push({
        x: clientPosition.x,
        y: clientPosition.y + (yDiff > 0 ? 1 : -1),
      });
    }
    route.push(cashDeskPosition);

    return route;
  }

  moveClientAnim(clientId: number, targetCashDeskId: number): Observable<any> {
    return this.clientService.getClient(clientId).pipe(
      switchMap(client => {
        return this.cashDeskService.getCashDesks().pipe(
          map(cashDesks => {
            const targetCashDesk = cashDesks.find(
              (cd: { id: number; }) => cd.id === targetCashDeskId
            );
            if (!targetCashDesk) {
              throw new Error('Target cash desk not found');
            }

            const route = this.calculateRoute(
              client.position,
              targetCashDesk.position
            );
            this.animateMovement(client, route);

            return { client, targetCashDesk, route };
          })
        );
      })
    );
  }

  private animateMovement(client: any, route: Position[]): void {
    let currentStep = 0;
    const totalSteps = route.length;

    const moveInterval = setInterval(() => {
      if (currentStep < totalSteps - 1) {
        client.position = route[currentStep];
        currentStep++;
      } else {
        clearInterval(moveInterval); 
      }
    }, 500); 
  }
}
