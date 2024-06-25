import { IReservationRead } from '../reservation/ireservation-read';

export interface ITripDetails {
  id: number;
  availableSeats: number;
  departureDate: Date;
  arrivalDate: Date;
  busClassName: string;
  busId: number;
  busNumber: number;
  startBranchName: string;
  startBranchId: number;
  endBranchName: string;
  endBranchId: number;
  price: number;
  ReservationReadDtos: IReservationRead[];
}
