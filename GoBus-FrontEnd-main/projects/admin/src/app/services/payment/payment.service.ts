import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  CreatePaymentIntent(reservationId: number) {
    return this.http.get(`${environment.Api}/payments/${reservationId}`);
  }
}
