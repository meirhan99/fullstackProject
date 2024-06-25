import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  GetAllByTripId(tripId: number) {
    return this.http.get(`${environment.Api}/Tickets/trip/${tripId}`);
  }
}
