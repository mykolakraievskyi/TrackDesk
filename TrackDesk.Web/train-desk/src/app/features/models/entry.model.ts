import { Position } from './position.model';

export interface Entry {
  id: number;
  position: Position;
  image: string;
  type: 'entry' | 'entry-door';
}

export class BaseEntry implements Entry {
  image: string;
  charactersInside: number[] = [];

  constructor(
    public id: number,
    public position: Position,
    public type: 'entry' | 'entry-door',
    charactersInside: number[] = []
  ) {
    this.charactersInside = charactersInside;
    //this.image = this.getImagePath();
    this.image = '../../../assets/images/entries/entry-door.png'; 
  }

  private getImagePath(): string {
    return this.type === 'entry'
      ? '../../../assets/images/entries/entry.png'
      : '../../../assets/images/entries/entry-door.png';
  }

  handleCharacterEntry(characterId: number): void {
    this.charactersInside.push(characterId);
    console.log(`Character ${characterId} entered through entrance ${this.id}`);
    // add logic from service
  }
}
