import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  constructor(private http: HttpClient) {}

  GetAllQuestions() {
    return this.http.get(`${environment.Api}/Questions`);
  }
}
