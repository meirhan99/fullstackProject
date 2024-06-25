import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IReportRead } from '../../../models/report/ireport-read';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
})
export class ReportDetailsComponent implements OnInit {
  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<ReportDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportRead
  ) {
    this.reportForm = this.fb.group({
      userName: [data?.userName || ''],
      userEmail: [data?.userEmail || ''],
      userPhone: [data?.userPhone || ''],
      messageTitle: [data?.messageTitle || ''],
      messageContent: [data?.messageContent || ''],
      reservationNumber: [data?.reservationNumber || ''],
    });
  }
  ngOnInit(): void {}

  get userName() {
    return this.reportForm.get('userName');
  }
  get userEmail() {
    return this.reportForm.get('userEmail');
  }
  get userPhone() {
    return this.reportForm.get('userPhone');
  }

  get messageTitle() {
    return this.reportForm.get('messageTitle');
  }

  get messageContent() {
    return this.reportForm.get('messageContent');
  }
  get reservationNumber() {
    return this.reportForm.get('reservationNumber');
  }
}
