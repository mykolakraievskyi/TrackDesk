import { Injectable } from '@angular/core';
import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';
//import { getPlural } from 'astar-typescript';
import * as AStar from 'astar-typescript';
import { HttpClient } from '@angular/common/http';

const CELL_SIZE = 31;

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private readonly speed: number = 5;
  public stationMatrix: number[][] = [];

  constructor(private http: HttpClient) {
    this.stationMatrix = [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    ];
  }

  initializeCashDeskPositions(CashDesks: CashDesk[]) {
    CashDesks.forEach(c => {
      const i = Math.round(c.position.x / CELL_SIZE);
      const j = Math.round(c.position.y / CELL_SIZE);
      this.stationMatrix[j][i] = 1;
      this.stationMatrix[j - 1][i] = 1;
      this.stationMatrix[j - 1][i + 1] = 1;
      this.stationMatrix[j][i + 1] = 1;
      this.stationMatrix[j + 1][i + 1] = 1;
      this.stationMatrix[j + 2][i + 1] = 1;
      this.stationMatrix[j - 1][i + 2] = 1;
      this.stationMatrix[j][i + 2] = 1;
      this.stationMatrix[j + 1][i + 2] = 1;
      this.stationMatrix[j + 2][i + 2] = 1;
    });
  }

  initializeWithClients(Clients: Client[], currentClient: Client): number[][] {
    const copyMatrix = this.stationMatrix.map(row => [...row]);
    Clients.forEach(c => {
      const i = Math.round(c.position.x / CELL_SIZE);
      const j = Math.round(c.position.y / CELL_SIZE);
      if (copyMatrix[j] && copyMatrix[j][i] !== undefined) {
        copyMatrix[j][i] = 1;
      }
    });
    const i = Math.round(currentClient.position.x / CELL_SIZE);
    const j = Math.round(currentClient.position.y / CELL_SIZE);
    copyMatrix[j][i] = 0;
    return copyMatrix;
  }

  moveClientToCashDesk(
    client: Client,
    cashDesk: CashDesk,
    allClients: Client[]
  ): void {
    const moveInterval = setInterval(() => {
      const targetClientPositionXY = cashDesk.getClientPosition(client);
      const targetPosition = {
        x: Math.round(targetClientPositionXY.x / CELL_SIZE),
        y: Math.round(targetClientPositionXY.y / CELL_SIZE),
      };

      const matrix = this.initializeWithClients(allClients, client);

      const aStarInstance = new AStar.AStarFinder({
        grid: {
          width: matrix[0].length,
          height: matrix.length,
          matrix: matrix,
        },
      });

      const clientPos = {
        x: Math.round(client.position.x / CELL_SIZE),
        y: Math.round(client.position.y / CELL_SIZE),
      };

      const bestPathway = aStarInstance.findPath(clientPos, targetPosition);

      if (!bestPathway || bestPathway.length === 0) {
        clearInterval(moveInterval);
        return;
      }

      let nextstep;
      if (bestPathway.length === 1) {
        nextstep = bestPathway[0];
      } else {
        nextstep = bestPathway[1];
      }

      const deltaX = nextstep[0] * CELL_SIZE - client.position.x;
      const deltaY = nextstep[1] * CELL_SIZE - client.position.y;

      if (Math.abs(deltaX) <= this.speed && Math.abs(deltaY) <= this.speed) {
        client.position.x = nextstep[0] * CELL_SIZE;
        client.position.y = nextstep[1] * CELL_SIZE;

        if (
          nextstep[0] === targetPosition.x &&
          nextstep[1] === targetPosition.y
        ) {
          this.serveClient(client, cashDesk);
          clearInterval(moveInterval);
        }
      } else {
        client.position.x +=
          Math.sign(deltaX) * Math.min(this.speed, Math.abs(deltaX));
        client.position.y +=
          Math.sign(deltaY) * Math.min(this.speed, Math.abs(deltaY));
      }
    }, 100);
  }

  serveClient(client: Client, cashDesk: CashDesk): void {
    if (!cashDesk.clientQueue.includes(client)) {
      cashDesk.addClient(client);
    }
    this.http
      .post(`http://127.0.0.1:8080/api/v1/cashdesk/buy/ticket`, {
        clientId: client.id,
        cashDeskId: cashDesk.id,
      })
      .subscribe(data => {});
  }
}
