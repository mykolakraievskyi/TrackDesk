import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';

export class MovementService {
  private readonly speed: number = 5; 

  moveClientToCashDesk(client: Client, cashDesk: CashDesk): void {
    client.targetCashDeskId = cashDesk.id; 
    const moveInterval = setInterval(() => {
      const deltaX = cashDesk.position.x - client.position.x;
      const deltaY = cashDesk.position.y - client.position.y;

      if (Math.abs(deltaX) <= this.speed && Math.abs(deltaY) <= this.speed) {
        client.position.x = cashDesk.position.x;
        client.position.y = cashDesk.position.y;
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
    clients: Client[]
  ): void {
    const bestCashDesk = this.findCashDeskWithFewestClients(cashDesks, clients);
    this.moveClientToCashDesk(client, bestCashDesk);
  }
}
