import { Position } from './position.model';
import { Client } from './client.model';
import { EClientType } from '../../types/client.type';
import { MovementService } from '../../shared/services/client-movement.service';

const QUEUE_OFFSET = 31;

export interface CashDesk {
  id: number;
  position: Position;
  image: string;
  type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box';
  clientQueue: Client[];
  isClosed: boolean;
  addClient(client: Client): void;
  popClient(): Client | undefined;
  peekClient(): Client | null;
  getPositionForPrivilaged(client :Client): Position;
  getFirstClientPositionForPrivilaged(): Position;
  getClientPosition(client: Client): Position;
  getFirstClientPosition(): Position;
}

export class BaseCashDesk implements CashDesk {
  image: string;
  clientQueue: Client[] = [];

  constructor(
    public id: number,
    public position: Position,
    public type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box',
    public isClosed: boolean = false,
    private movementService?: MovementService
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
    if (this.clientQueue.length == 0) {
      return null;
    } else {
      return this.clientQueue[0];
    }
  }

  getPositionForPrivilaged(client:Client): Position{
    if(this.type === "ticket-box"){
      if (!this.clientQueue.includes(client)) {
        this.addClient(client);
      }
      const index = this.clientQueue.indexOf(client)
      return {
        x: this.position.x + 3,
        y: this.position.y + (index + 1) * QUEUE_OFFSET,
      };
    }else{
    if (!this.clientQueue.includes(client)) {
      this.addClient(client);
    }
    const index = this.clientQueue.filter(c=> c.type == EClientType.PRIVILEGED).indexOf(client)
    return {
      x: this.position.x + QUEUE_OFFSET +3,
      y: this.position.y + (index+1) * QUEUE_OFFSET,
    };
  }
  }

  getClientPosition(client: Client): Position {
    if(this.type == "ticket-box"){
      if (!this.clientQueue.includes(client)) {
        this.addClient(client);
      }
      const index = this.clientQueue.indexOf(client)
      return {
        x: this.position.x + 3,
        y: this.position.y + (index + 1) * QUEUE_OFFSET,
      };
    }
    if (!this.clientQueue.includes(client)) {
      this.addClient(client);
    }
    const index = this.clientQueue.filter(c=> c.type == EClientType.REGULAR).indexOf(client)
    return {
      x: this.position.x + 3,
      y: this.position.y + (index + 1) * QUEUE_OFFSET,
    };
  }

  getFirstClientPosition(): Position{
    return {
      x: this.position.x + 3,
      y: this.position.y + QUEUE_OFFSET,
    };
  }

  getFirstClientPositionForPrivilaged(): Position{
    if(this.type == "ticket-box"){
      return {
        x: this.position.x + 3,
        y: this.position.y + QUEUE_OFFSET,
      };
    }
    return {
      x: this.position.x + QUEUE_OFFSET+3,
      y: this.position.y + QUEUE_OFFSET,
    };
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
