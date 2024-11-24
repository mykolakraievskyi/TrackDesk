import { Injectable } from '@angular/core';
import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';
import { StaticObstacle } from '../../features/models/obstacle.model';
import { Position } from '../../features/models/position.model';
//import { getPlural } from 'astar-typescript';
import * as AStar from 'astar-typescript';

const CELL_SIZE = 31;

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private readonly speed: number = 5;
  public stationMatrix: number[][] = [];
 //private readonly staticObstacles: StaticObstacle[] = [];

  constructor() {
    // this.staticObstacles.push(
    //   new StaticObstacle(
    //     { x: 1000, y: 300 },
    //     { x: 1350, y: 300 },
    //     { x: 1000, y: 0 },
    //     { x: 1350, y: 0 }
    //   ),
    //   new StaticObstacle(
    //     { x: 0, y: 560 },
    //     { x: 200, y: 560 },
    //     { x: 0, y: 290 },
    //     { x: 200, y: 290 }
    //   )
    // );

    this.stationMatrix = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }

  initializeCashDeskPositions(CashDesks: CashDesk[]){
    CashDesks.forEach(c => { 
      const i = Math.round(c.position.x/CELL_SIZE);
      const j = Math.round(c.position.y/CELL_SIZE);
      this.stationMatrix[j][i] = 1;
      this.stationMatrix[j-1][i] = 1;
      this.stationMatrix[j-1][i+1] = 1;
      this.stationMatrix[j][i+1] = 1;
      this.stationMatrix[j+1][i+1] = 1;
      this.stationMatrix[j+2][i+1] = 1;
      this.stationMatrix[j-1][i+2] = 1;
      this.stationMatrix[j][i+2] = 1;
      this.stationMatrix[j+1][i+2] = 1;
      this.stationMatrix[j+2][i+2] = 1;
  })
}

initializeWithClients(Clients: Client[], currentClient:Client): number[][] {
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



  //detectCollisions(): void {}

  moveClientToCashDesk(
    client: Client,
    cashDesk: CashDesk,
    allClients: Client[],
  ): void {
    const moveInterval = setInterval(() => {
      const targetClientPositionXY = cashDesk.getClientPosition(client);
      const targetPosition = {
        x: Math.round(targetClientPositionXY.x/CELL_SIZE),
        y: Math.round(targetClientPositionXY.y/CELL_SIZE),
      };

      const matrix = this.initializeWithClients(allClients, client);

      const aStarInstance = new AStar.AStarFinder({
        grid: {
          width: matrix[0].length,
          height: matrix.length,
          matrix: matrix
        }
      });

      const clientPos = {x: Math.round(client.position.x/CELL_SIZE),
        y: Math.round(client.position.y/CELL_SIZE)};

      const bestPathway = aStarInstance.findPath(
        clientPos,
        targetPosition
        );

        if (!bestPathway || bestPathway.length === 0) {
          clearInterval(moveInterval);
          return;
        }

      let nextstep;
      if(bestPathway.length === 1){
      nextstep = bestPathway[0]
      }else{
       nextstep = bestPathway[1]
      }

      const deltaX = ((nextstep[0]*CELL_SIZE)) - client.position.x;
      const deltaY = ((nextstep[1]*CELL_SIZE)) - client.position.y;

      if (Math.abs(deltaX) <= this.speed && Math.abs(deltaY) <= this.speed) {
        client.position.x = nextstep[0] * CELL_SIZE;
        client.position.y = nextstep[1] * CELL_SIZE;

        if (nextstep[0] === targetPosition.x && nextstep[1] === targetPosition.y) {
          this.serveClient(client, cashDesk);
          clearInterval(moveInterval);
        }
      } else {
        client.position.x += Math.sign(deltaX) * Math.min(this.speed, Math.abs(deltaX));
        client.position.y += Math.sign(deltaY) * Math.min(this.speed, Math.abs(deltaY));
      }
    }, 100);
  }

  // correctPosition(oldPosition: Position, newPosition: Position): Position {
  //   let position: Position = newPosition;
  //   for (let obstacle of this.staticObstacles) {
  //     if (
  //       newPosition.x > obstacle.topLeft.x &&
  //       newPosition.x < obstacle.bottobRigth.x &&
  //       newPosition.y > obstacle.topLeft.y &&
  //       newPosition.y < obstacle.bottobRigth.y
  //     ) {
  //       //correction
  //       if (oldPosition.x < obstacle.topLeft.x) {
  //         position.x = obstacle.topLeft.x;
  //       }
  //       if (oldPosition.x > obstacle.bottobRigth.x) {
  //         position.x = obstacle.bottobRigth.x;
  //       }
  //       if (oldPosition.y < obstacle.topLeft.y) {
  //         position.y = obstacle.topLeft.y;
  //       }
  //       if (newPosition.y > obstacle.bottobRigth.y) {
  //         position.y = obstacle.bottobRigth.y;
  //       }
  //     }
  //   }

  //   return newPosition;
  // }

  // findCashDeskWithFewestClients(
  //   cashDesks: CashDesk[],
  //   clients: Client[]
  // ): CashDesk {
  //   return cashDesks.reduce((minDesk, currentDesk) => {
  //     const minDeskClientCount = minDesk.clientQueue.length;
  //     const currentDeskClientCount = currentDesk.clientQueue.length;

  //     return currentDeskClientCount < minDeskClientCount
  //       ? currentDesk
  //       : minDesk;
  //   }, cashDesks[0]);
  // }

  // assignClientToBestCashDesk(
  //   client: Client,
  //   cashDesks: CashDesk[],
  //   clients: Client[],
  //   allClients: Client[],
  //   allCashDesks: CashDesk[]
  // ): void {
  //   const bestCashDesk = this.findCashDeskWithFewestClients(cashDesks, clients);
  //   this.moveClientToCashDesk(client, bestCashDesk, allClients, allCashDesks);
  // }

  // )))))))
  serveClient(client: Client, cashDesk: CashDesk): void {
    if (!cashDesk.clientQueue.includes(client)) {
      cashDesk.addClient(client);
    }

    // Тут виклик сервісу для обслуговування

    // var deadClient = cashDesk.popClient();

    // if (deadClient) {
    //   for (let i = cashDesk.clientQueue.length - 1; i >= 0; ++i) {
    //     if (i > 0) {
    //       cashDesk.clientQueue[i - 1].position =
    //         cashDesk.clientQueue[i].position;
    //     } else {
    //       cashDesk.clientQueue[i].position = deadClient.position;
    //     }
    //   }
    // } else {
    //   // похуй
    // }
  }

  relocateClients(currentDesk: CashDesk, newDsk: CashDesk) {}
}
