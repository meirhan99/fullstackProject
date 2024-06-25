import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}
  GetAllReservations() {
    return this.http.get(`${environment.Api}/Reservations`);
  }

  FilterReservationsByTripId(tripId: number) {
    return this.http.get(`${environment.Api}/Reservations/tripId/${tripId}`);
  }

  FilterReservationsByUserId(userId: string) {
    return this.http.get(`${environment.Api}/Reservations/userId/${userId}`);
  }

  FilterReservationsByDate(date: Date) {
    return this.http.get(`${environment.Api}/Reservations/filter/${date}`);
  }

  DeleteReservation(id: number) {
    return this.http.delete(`${environment.Api}/Reservations/${id}`);
  }
}
