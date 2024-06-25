import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusClassService {
  constructor(private http: HttpClient) {}

  GetAllBusClasses() {
    return this.http.get(`${environment.Api}/BusClasses/details`);
  }
}
