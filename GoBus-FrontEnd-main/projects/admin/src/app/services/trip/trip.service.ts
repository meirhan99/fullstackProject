import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITripAdd } from '../../models/trip/itrip-add';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  GetAllTrips() {
    return this.http.get(`${environment.Api}/trips`);
  }

  FilterTripsByDate(date: Date) {
    return this.http.get(`${environment.Api}/trips/filter/${date}`);
  }

  Addtrip(trip: ITripAdd) {
    return this.http.post(`${environment.Api}/trips`, trip);
  }

  UpdateTrip(tripId: number, trip: ITripAdd) {
    return this.http.put(`${environment.Api}/trips/${tripId}`, trip);
  }

  DeleteTrip(tripId: number) {
    return this.http.delete(`${environment.Api}/trips/${tripId}`);
  }
}
