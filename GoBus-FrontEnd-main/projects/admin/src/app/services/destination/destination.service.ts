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

  AddDestination(destination: any) {
    return this.http.post(`${environment.Api}/Destinations`, destination);
  }

  UpdateDestination(destinationId: number, destination: any) {
    return this.http.put(
      `${environment.Api}/Destinations/${destinationId}`,
      destination
    );
  }

  DeleteDestination(destinationId: number) {
    return this.http.delete(`${environment.Api}/Destinations/${destinationId}`);
  }
  
}
