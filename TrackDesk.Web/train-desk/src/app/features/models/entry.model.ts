import { Position } from "./position.model";

export interface Entry {
  id: number;
  position: Position;
  image: string;
  type: 'entry' | 'entry-door';
}

export class BaseEntry implements Entry {
  id: number;
  position: Position;
  type: 'entry' | 'entry-door';
  image: string;

  constructor(id: number, position: Position, type: 'entry' | 'entry-door') {
    this.id = id;
    this.position = position;
    this.type = type;
    this.image = this.getImagePath();
  }

  private getImagePath(): string {
    return this.type === 'entry'
      ? `assets/images/entries/entry.png`
      : `assets/images/entries/entry-door.png`;
  }
}
