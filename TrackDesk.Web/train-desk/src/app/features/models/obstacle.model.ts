import { Client } from './client.model';
import { Position } from './position.model';

export interface BaseObstacle {
  bottomLeft: Position;
  bottobRigth: Position;
  topLeft: Position;
  topRight: Position;
  recalculate(): void;
}
export const CLIENT_WIDTH_PX = 5;
export const CLIENT_HEIGHT_PX = 10;

export class ClientObstacle implements BaseObstacle {
  bottomLeft: Position;
  bottobRigth: Position;
  topLeft: Position;
  topRight: Position;

  constructor(private client: Client) {
    this.topLeft = client.position;
    this.topRight = {
      x: client.position.x + CLIENT_WIDTH_PX,
      y: client.position.y,
    };
    this.bottomLeft = {
      x: client.position.x,
      y: client.position.y + CLIENT_HEIGHT_PX,
    };
    this.bottobRigth = {
      x: client.position.x + CLIENT_WIDTH_PX,
      y: client.position.y + CLIENT_HEIGHT_PX,
    };
  }

  recalculate() {
    this.topLeft = this.client.position;
    this.topRight = {
      x: this.client.position.x + CLIENT_WIDTH_PX,
      y: this.client.position.y,
    };
    this.bottomLeft = {
      x: this.client.position.x,
      y: this.client.position.y + CLIENT_HEIGHT_PX,
    };
    this.bottobRigth = {
      x: this.client.position.x + CLIENT_WIDTH_PX,
      y: this.client.position.y + CLIENT_HEIGHT_PX,
    };
  }
}
