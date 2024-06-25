export interface IReservationDetails {
  id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  date: Date;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  seatNumbers: number[];
  tripId: number;
  departureDate: Date;
  arrivalDate: Date;
  busClassName: string;
  busNumber: number;
  startBranchName: string;
  endBranchName: string;
}
