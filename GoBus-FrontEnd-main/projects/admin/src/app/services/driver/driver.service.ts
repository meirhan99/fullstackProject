import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUserRead } from '../../models/user/iuser-read';

@Injectable({
  providedIn: 'root'
})

export class DriverService {
  constructor(private http: HttpClient) {}

  GetAllDrivers() {
    return this.http.get(`${environment.Api}/drivers`);
  }

  DeleteDriver(userId: string) {
    return this.http.delete(`${environment.Api}/ApplicationUsers/${userId}`);
  }

  RegisterDriver(driverRegister: IUserRead) {
    return this.http.post(`${environment.Api}/ApplicationUsers/register/driver`, driverRegister);
  }
  GetAllUserNames() {
    return this.http.get(`${environment.Api}/users/usernames`);
  }

  GetAllEmails() {
    return this.http.get(`${environment.Api}/users/emails`);
  }
}
