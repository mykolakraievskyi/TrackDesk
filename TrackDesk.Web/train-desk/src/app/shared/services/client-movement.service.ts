import { CashDesk } from '../../features/models/cash-desk.model';
import { Client } from '../../features/models/client.model';

export class MovementService {
  private readonly speed: number = 5; 

  moveClientToCashDesk(client: Client, cashDesk: CashDesk): void {
    client.targetCashDeskId = cashDesk.id; 
    const moveInterval = setInterval(() => {
      const deltaX = cashDesk.position.x - client.position.x;
      const deltaY = (cashDesk.position.y + (cashDesk.clients.indexOf(client.id)+1)*40) - client.position.y;
      console.log(cashDesk.clients.indexOf(client.id))
      console.log(cashDesk)

      if (Math.abs(deltaX) <= this.speed && Math.abs(deltaY) <= this.speed) {
        client.position.x = cashDesk.position.x;
        client.position.y = cashDesk.position.y + (cashDesk.clients.indexOf(client.id)+1)*40;
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
  ): CashDesk {
    return cashDesks.reduce((minDesk, currentDesk) => {
      const minDeskClientCount = minDesk.clients.length;
      const currentDeskClientCount = currentDesk.clients.length;

      return currentDeskClientCount < minDeskClientCount
        ? currentDesk
        : minDesk;
    }, cashDesks[0]);
  }

  assignClientToBestCashDesk(
    client: Client,
    cashDesks: CashDesk[],
  ): void {
    const bestCashDesk = this.findCashDeskWithFewestClients(cashDesks);
    bestCashDesk.clients.push(client.id);
    this.moveClientToCashDesk(client, bestCashDesk);
  }
}
