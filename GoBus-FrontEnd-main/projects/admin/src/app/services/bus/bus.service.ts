import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IBusAdd } from '../../models/bus/ibus-add';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  constructor(private http: HttpClient) {}

  GetAllBuses() {
    return this.http.get(`${environment.Api}/Buses`);
  }
  GetAllAvailableBuses(departureDate: Date, arrivalDate: Date) {
    return this.http.get(
      `${environment.Api}/Buses/Available/${departureDate}/${arrivalDate}`
    );
  }

  AddBus(bus: IBusAdd) {
    return this.http.post(`${environment.Api}/Buses`, bus);
  }

  UpdateBus(busId: number, bus: IBusAdd) {
    return this.http.put(`${environment.Api}/Buses/${busId}`, bus);
  }

  DeleteBus(id: number) {
    return this.http.delete(`${environment.Api}/Buses/${id}`);
  }

  GetBusesByClassId(classId: number) {
    return this.http.get(`${environment.Api}/Buses/classId/${classId}`);
  }
}
