import { Position } from './position.model';

export interface Client {
  id: number;
  position: Position;
  image: string;
  type: 'regular' | 'privileged';

  move(): void;
}

export class BaseClient implements Client {
  image: string;

  constructor(
    public id: number,
    public position: Position,
    public type: 'regular' | 'privileged'
  ) {
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

  move(): void {
    console.log(`${this.type} client is moving with custom behavior`);
    //add logic from service for both types
  }
}
