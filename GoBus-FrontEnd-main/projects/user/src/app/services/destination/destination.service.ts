import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  constructor(private http: HttpClient) {}

  GetAllDestinations() {
    return this.http.get(`${environment.Api}/Destinations`);
  }
}
