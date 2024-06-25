import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ILogin } from '../../models/login/ilogin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  Login(login: ILogin) {
    return this.http.post(`${environment.Api}/ApplicationUsers/Login`, login);
  }

  GetAllUsers() {
    return this.http.get(`${environment.Api}/users`);
  }

  DeleteUser(userId: string) {
    return this.http.delete(`${environment.Api}/ApplicationUsers/${userId}`);
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
  BlockUser(id: string) {
    return this.http.get(`${environment.Api}/ApplicationUsers/block/${id}`);
  }
}
