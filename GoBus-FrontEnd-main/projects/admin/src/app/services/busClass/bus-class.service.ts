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

  AddBusClass(busClass: any) {
    return this.http.post(`${environment.Api}/BusClasses`, busClass);
  }

  UpdateBusClass(busClassId: number, busClass: any) {
    return this.http.put(`${environment.Api}/BusClasses/${busClassId}`, busClass);
  }

  DeleteBusClass(id: number) {
    return this.http.delete(`${environment.Api}/BusClasses/${id}`);
  }
}
