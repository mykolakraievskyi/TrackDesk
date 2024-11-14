import { Position } from './position.model';

export interface Exit {
  id: number;
  position: Position;
  image: string;
  type: 'exit' | 'exit-door';
}

export class BaseExit implements Exit {
  id: number;
  position: Position;
  type: 'exit' | 'exit-door';
  image: string;

  constructor(id: number, position: Position, type: 'exit' | 'exit-door') {
    this.id = id;
    this.position = position;
    this.type = type;
    this.image = this.getImagePath();
  }

  private getImagePath(): string {
    return this.type === 'exit'
      ? `assets/images/entries/exit.png`
      : `assets/images/entries/exit-door.png`;
  }

}
