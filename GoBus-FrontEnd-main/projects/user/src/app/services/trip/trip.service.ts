import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IFilterTrip } from '../../models/ifilter-trip';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpClient) {}

  FilterTrips(filterTrip: IFilterTrip) {
    return this.http.post(`${environment.Api}/trips/search`, filterTrip);
  }

  GetById(tripId: number) {
    return this.http.get(`${environment.Api}/trips/${tripId}`);
  }
}
