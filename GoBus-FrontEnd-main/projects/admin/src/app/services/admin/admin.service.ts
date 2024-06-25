import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUserRead } from '../../models/user/iuser-read';
import { ILogin } from '../../models/login/ilogin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  GetAllAdmins() {
    return this.http.get(`${environment.Api}/admins`);
  }

  DeleteAdmin(adminId: string) {
    return this.http.delete(`${environment.Api}/ApplicationUsers/${adminId}`);
  }

  RegisterAdmin(driverRegister: IUserRead) {
    return this.http.post(`${environment.Api}/ApplicationUsers/register/admin`, driverRegister);
  }
  GetAllUserNames() {
    return this.http.get(`${environment.Api}/users/usernames`);
  }

  GetAllEmails() {
    return this.http.get(`${environment.Api}/users/emails`);
  }

  GetAdmin() {
    return this.http.get(`${environment.Api}/ApplicationUsers/getAdmin`);
  }

  Login(login: ILogin) {
    return this.http.post(`${environment.Api}/ApplicationUsers/Login`, login);
  }
}
