import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IReport } from '../../models/ireport';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  AddReport(report: IReport) {
    return this.http.post(`${environment.Api}/reports`, report);
  }
}
