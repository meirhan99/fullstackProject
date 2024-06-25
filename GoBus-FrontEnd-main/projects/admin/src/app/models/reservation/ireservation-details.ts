export interface IReservationDetails {
  id: number;
  tripId: number;
  date: Date;
  startBranchName: string;
  endBranchName: string;
  departureDate: string;
  arrivalDate: string;
  busClassName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  seatNumbers: number[];
  userName: string;
}
