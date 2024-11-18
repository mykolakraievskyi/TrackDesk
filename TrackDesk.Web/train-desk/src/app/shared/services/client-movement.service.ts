import { CashDesk } from "../../features/models/cash-desk.model";
import { Client } from "../../features/models/client.model";


export class MovementService {
  private readonly speed: number = 5; 

  moveClientToCashDesk(client: Client, cashDesk: CashDesk): void {
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
}
