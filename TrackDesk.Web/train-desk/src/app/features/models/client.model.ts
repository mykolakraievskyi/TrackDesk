import { Position } from "./position.model";

export interface Client {
  id: number;
  position: Position;
  image: string;
  type: 'regular' | 'privileged';
}

export class BaseClient implements Client {
  id: number;
  position: Position;
  type: 'regular' | 'privileged';
  image: string;

  constructor(id: number, position: Position, type: 'regular' | 'privileged') {
    this.id = id;
    this.position = position;
    this.type = type;
    this.image = this.getImagePath();
  }

  private getImagePath(): string {
    const randomImageNumber = this.getRandomNumber(1, 7);
    return this.type === 'regular'
      ? `assets/images/regular/regular-client-${randomImageNumber}.png`
      : `assets/images/privileged/privileged-client-${randomImageNumber}.png`;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
