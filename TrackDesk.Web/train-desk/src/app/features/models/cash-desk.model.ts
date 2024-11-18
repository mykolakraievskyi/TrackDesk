import { Position } from './position.model';

export interface CashDesk {
  id: number;
  position: Position;
  image: string;
  type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box';
}

export class BaseCashDesk implements CashDesk {
  image: string;

  constructor(
    public id: number,
    public position: Position,
    public type: 'cash-desk' | 'closed-cash-desk' | 'ticket-box'
  ) {
    this.image = this.getImagePath();
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
