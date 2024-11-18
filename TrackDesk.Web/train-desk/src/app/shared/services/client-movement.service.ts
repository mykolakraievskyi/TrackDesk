import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';
import { StaticObstacle } from '../../features/models/obstacle.model';
import { Position } from '../../features/models/position.model';

const QUEUE_OFFSET = 32;
export class MovementService {
  private readonly speed: number = 5;
  private readonly staticObstacles: StaticObstacle[] = [];

  constructor() {
    this.staticObstacles.push(
      new StaticObstacle(
        { x: 1000, y: 300 },
        { x: 1350, y: 300 },
        { x: 1000, y: 0 },
        { x: 1350, y: 0 }
      ),
      new StaticObstacle(
        { x: 0, y: 560 },
        { x: 200, y: 560 },
        { x: 0, y: 290 },
        { x: 200, y: 290 }
      )
    );
  }

  detectCollisions(): void {}

  moveClientToCashDesk(
    client: Client,
    cashDesk: CashDesk,
    allClients: Client[],
    allCashDesks: CashDesk[]
  ): void {
    client.targetCashDeskId = cashDesk.id;
    const moveInterval = setInterval(() => {
      const lastClientPosition = cashDesk.getClientPosition(client);
      const targetPosition = {
        x: lastClientPosition.x,
        y: lastClientPosition.y + QUEUE_OFFSET,
      };

      const deltaX = targetPosition.x - client.position.x;
      const deltaY = targetPosition.y - client.position.y;

      if (Math.abs(deltaX) <= this.speed && Math.abs(deltaY) <= this.speed) {
        client.position.x = targetPosition.x;
        client.position.y = targetPosition.y;
        this.serveClient(client, cashDesk);
        clearInterval(moveInterval);
        return;
      }

      let newPosition = {
        x:
          client.position.x +
          Math.sign(deltaX) * Math.min(this.speed, Math.abs(deltaX)),
        y:
          client.position.y +
          Math.sign(deltaY) * Math.min(this.speed, Math.abs(deltaY)),
      };

      client.position = this.correctPosition(client.position, newPosition);
    }, 100);
  }

  correctPosition(oldPosition: Position, newPosition: Position): Position {
    let position: Position = newPosition;
    for (let obstacle of this.staticObstacles) {
      if (
        newPosition.x > obstacle.topLeft.x &&
        newPosition.x < obstacle.bottobRigth.x &&
        newPosition.y > obstacle.topLeft.y &&
        newPosition.y < obstacle.bottobRigth.y
      ) {
        //correction
        if (oldPosition.x < obstacle.topLeft.x) {
          position.x = obstacle.topLeft.x;
        }
        if (oldPosition.x > obstacle.bottobRigth.x) {
          position.x = obstacle.bottobRigth.x;
        }
        if (oldPosition.y < obstacle.topLeft.y) {
          position.y = obstacle.topLeft.y;
        }
        if (newPosition.y > obstacle.bottobRigth.y) {
          position.y = obstacle.bottobRigth.y;
        }
      }
    }

    return newPosition;
  }

  findCashDeskWithFewestClients(
    cashDesks: CashDesk[],
    clients: Client[]
  ): CashDesk {
    return cashDesks.reduce((minDesk, currentDesk) => {
      const minDeskClientCount = minDesk.clientQueue.length;
      const currentDeskClientCount = currentDesk.clientQueue.length;

      return currentDeskClientCount < minDeskClientCount
        ? currentDesk
        : minDesk;
    }, cashDesks[0]);
  }

  assignClientToBestCashDesk(
    client: Client,
    cashDesks: CashDesk[],
    clients: Client[],
    allClients: Client[],
    allCashDesks: CashDesk[]
  ): void {
    const bestCashDesk = this.findCashDeskWithFewestClients(cashDesks, clients);
    this.moveClientToCashDesk(client, bestCashDesk, allClients, allCashDesks);
  }

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
