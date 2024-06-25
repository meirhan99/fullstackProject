import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/iuser';
import { environment } from '../../environments/environment';
import { ILogin } from '../../models/ilogin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  Login(login: ILogin) {
    return this.http.post(`${environment.Api}/ApplicationUsers/Login`, login);
  }

  Register(register: IUser) {
    return this.http.post(`${environment.Api}/ApplicationUsers/register`, register);
  }
  GetAllUserNames() {
    return this.http.get(`${environment.Api}/users/usernames`);
  }

  GetAllEmails() {
    return this.http.get(`${environment.Api}/users/emails`);
  }

  GetUser() {
    return this.http.get(`${environment.Api}/ApplicationUsers/getUser`);
  }
}
