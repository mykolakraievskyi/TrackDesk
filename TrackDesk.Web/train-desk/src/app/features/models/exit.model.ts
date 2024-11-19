import { Position } from './position.model';

export interface Exit {
  id: number;
  position: Position;
  image: string;
  type: 'exit' | 'exit-door';
  handleCharacterExit(characterId: number): void;
}

export class BaseExit implements Exit {
  image: string;
  charactersInside: number[] = [];

  constructor(
    public id: number,
    public position: Position,
    public type: 'exit' | 'exit-door'
  ) {
    this.image = this.getImagePath();
  }

  private getImagePath(): string {
    return this.type === 'exit'
      ? '../../../assets/images/entries/exit.png'
      : '../../../assets/images/entries/exit-door.png';
  }

  handleCharacterExit(characterId: number): void {
    const index = this.charactersInside.indexOf(characterId);
    if (index > -1) {
      this.charactersInside.splice(index, 1);
      console.log(`Character ${characterId} exited through exit ${this.id}`);
    } else {
      console.log(`Character ${characterId} is not inside this exit.`);
    }
  }
}
