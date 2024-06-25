export interface IFilterTrip {
  twoWay: boolean;
  quantity: number;
  departureDate: string | null;
  returnDate: Date;
  startBranchId: number;
  endBranchId: number;
}
