import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  constructor(private http: HttpClient) {}

  GetById(busId:number) {
    return this.http.get(`${environment.Api}/Buses/${busId}`);
  }
}
