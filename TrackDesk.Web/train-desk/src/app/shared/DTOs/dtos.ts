import { Position } from '../../features/models/position.model';

export interface CloseCashDeskRequest {
  closed: boolean;
  cashDeskId: number;
}
export interface ConfigurationRequest {
  cashDesks: EntityDto[];
  entrances: EntityDto[];
  secondsStart: number;
  secondsEnd: number;
}
interface EntityDto {
  id: number;
  position: Position;
}
