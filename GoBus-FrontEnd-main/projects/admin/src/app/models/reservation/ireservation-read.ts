export interface IReservationRead {
  id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  date: Date;
  userName: string;
  seatNumbers: number[];
}
