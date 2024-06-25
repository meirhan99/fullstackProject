import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  GetAllReports() {
    return this.http.get(`${environment.Api}/reports`);
  }

  GetAllReportsByUserId(userId: string) {
    return this.http.get(`${environment.Api}/reports/userId/${userId}`);
  }

  DeleteReport(reportId: number) {
    return this.http.delete(`${environment.Api}/reports/${reportId}`);
  }
}
