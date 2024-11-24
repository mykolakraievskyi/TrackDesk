export interface ILog {
  id: number;
  clientId: number;
  clientStatus: boolean;
  cashDeskId: number;
  tickets: ITicket[];
  startTime: string;
  endTime: string;
}

export interface ITicket {
  ticketId: number;
  train: string;
  carriage: number;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}
