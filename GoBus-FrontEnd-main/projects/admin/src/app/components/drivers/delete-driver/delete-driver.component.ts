import { Component, OnInit, Inject } from '@angular/core';
import { DriverService } from '../../../services/driver/driver.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.scss'],
})
export class DeleteDriverComponent implements OnInit {
  constructor(
    private driverService: DriverService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.driverService.DeleteDriver(this.data).subscribe({
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
