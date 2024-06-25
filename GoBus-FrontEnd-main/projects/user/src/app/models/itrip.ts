export interface ITrip {
  id: number;
  quantity: number;
  availableSeats: number;
  departureDate: Date;
  arrivalDate: Date;
  busId: number;
  busClassName: string;
  startBranchName: string;
  endBranchName: string;
  price: number;
  totalPrice: number;
}
