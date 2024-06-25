import { Component, OnInit } from '@angular/core';
import { IReportRead } from '../../../models/report/ireport-read';
import { ReportService } from '../../../services/report/report.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { ReportDetailsComponent } from '../report-details/report-details.component';
import { DeleteReportComponent } from '../delete-report/delete-report.component';
import { UserService } from '../../../services/user/user.service';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss'],
})
export class AllReportsComponent implements OnInit {
  reports: IReportRead[] = [];
  users: IUserRead[] = [];

  constructor(
    private reportService: ReportService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.GetAllReports();
    this.GetAllUsers();
  }

  FilterReports(userId: any) {
    if (userId.value == '0') {
      this.GetAllReports();
    } else {
      this.GetAllReportsByUserId(userId.value);
    }
  }

  GetAllReports() {
    this.reportService.GetAllReports().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.reports = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetAllReportsByUserId(userId: string) {
    this.reportService.GetAllReportsByUserId(userId).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.reports = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetAllUsers() {
    this.userService.GetAllUsers().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.users = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  ReportDetails(report: IReportRead) {
    const dialogRef = this.dialog.open(ReportDetailsComponent, {
      width: '750px',
      data: report,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllReports();
      }
    });
  }

  DeleteReport(reportId: number) {
    const dialogRef = this.dialog.open(DeleteReportComponent, {
      width: '750px',
      data: reportId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllReports();
      }
    });
  }
}
