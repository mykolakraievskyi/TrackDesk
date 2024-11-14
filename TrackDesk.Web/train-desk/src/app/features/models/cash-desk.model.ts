import { Position } from './position.model';

export interface CashDesk {
  id: number;
  position: Position;
  image: string;
  type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box';
}

export class BaseCashDesk implements CashDesk {
  id: number;
  position: Position;
  image: string;
  type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box';

  constructor(
    id: number,
    position: Position,
    type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box'
  ) {
    this.id = id;
    this.position = position;
    this.image = this.getImagePath();
    this.type = type;
  }

  private getImagePath(): string {
    switch (this.type) {
      case 'cash-desk':
        return `assets/images/cash-desk/cash-desk.png`;
      case 'closed-cash-desk':
        return `assets/images/closed-cash-desk/closed-cash-desk.png`;
      case 'ticket-box':
        return `assets/images/ticket-box/ticket-box.png`;
    }
  }
}
