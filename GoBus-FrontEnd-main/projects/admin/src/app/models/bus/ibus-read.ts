export interface IBusRead {
  id: number;
  number: number;
  capacity: number;
  available: boolean;
  currentBranch: string;
  model: string;
  year: string;
  classBusName: string;
  classBusId: number;
  driverId: string;
  driverFirstName: string;
  driverLastName: string;
  noOfTrips: number;
}
