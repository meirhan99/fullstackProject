import { Component, OnInit,Inject } from '@angular/core';
import { ReportService } from '../../../services/report/report.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrls: ['./delete-report.component.scss'],
})
export class DeleteReportComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.reportService.DeleteReport(this.data).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
