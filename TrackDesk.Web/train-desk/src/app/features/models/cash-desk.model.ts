import { Position } from './position.model';
import { Client } from './client.model';
export interface CashDesk {
  id: number;
  position: Position;
  image: string;
  type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box';
  clientQueue: Client[];
  addClient(client: Client): void;
  popClient(): Client | undefined;
  peekClient(): Client | null;
  getClientPosition(client: Client): Position;
}

export class BaseCashDesk implements CashDesk {
  image: string;
  clientQueue: Client[] = [];

  constructor(
    public id: number,
    public position: Position,
    public type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box'
  ) {
    this.image = this.getImagePath();
  }

  get positionForClient() {
    return;
  }

  addClient(client: Client): void {
    this.clientQueue.push(client);
  }

  popClient(): Client | undefined {
    return this.clientQueue.shift();
  }

  peekClient(): Client | null {
    if ((this.clientQueue.length = 0)) {
      return null;
    } else {
      return this.clientQueue[0];
    }
  }

  getClientPosition(client: Client): Position {
    if (this.clientQueue.includes(client)) {
      const index = this.clientQueue.indexOf(client);
      if (index === 0) {
        return this.position;
      } else {
        return this.clientQueue[index - 1].position;
      }
    } else {
      if (this.clientQueue.length > 0) {
        return this.clientQueue[this.clientQueue.length - 1].position;
      } else {
        return this.position;
      }
    }
  }

  private getImagePath(): string {
    switch (this.type) {
      case 'cash-desk':
        return '../../../assets/images/cash-desks/cash-desk.png';
      case 'closed-cash-desk':
        return '../../../assets/images/cash-desks/closed-cash-desk.png';
      case 'ticket-box':
        return '../../../assets/images/cash-desks/ticket-box.png';
      default:
        return '../../../assets/images/cash-desks/cash-desk.png';
    }
  }
}
