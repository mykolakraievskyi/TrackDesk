import { transition } from '@angular/animations';
import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';
import { CLIENT_WIDTH_PX } from '../../features/models/obstacle.model';

const QUEUE_OFFSET = 32;
export class MovementService {
  private readonly speed: number = 5;

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

      // console.log(targetPosition);
      // console.log(cashDesk.clientQueue);

      const deltaX = targetPosition.x - client.position.x;
      const deltaY = targetPosition.y - client.position.y;

      if (Math.abs(deltaX) <= this.speed && Math.abs(deltaY) <= this.speed) {
        client.position.x = targetPosition.x;
        client.position.y = targetPosition.y;
        this.serveClient(client, cashDesk);
        clearInterval(moveInterval);
        return;
      }

      client.position.x +=
        Math.sign(deltaX) * Math.min(this.speed, Math.abs(deltaX));
      client.position.y +=
        Math.sign(deltaY) * Math.min(this.speed, Math.abs(deltaY));
    }, 100);
  }

  findCashDeskWithFewestClients(
    cashDesks: CashDesk[],
    clients: Client[]
  ): CashDesk {
    return cashDesks.reduce((minDesk, currentDesk) => {
      const minDeskClientCount = clients.filter(
        client => client.targetCashDeskId === minDesk.id
      ).length;
      const currentDeskClientCount = clients.filter(
        client => client.targetCashDeskId === currentDesk.id
      ).length;

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
    console.log('serving');
    if (!cashDesk.clientQueue.includes(client)) {
      console.log('inserting');

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
}
