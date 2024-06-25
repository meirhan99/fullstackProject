import { Component, OnInit, Inject } from '@angular/core';
import { BusService } from '../../../services/bus/bus.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.scss'],
})
export class DeleteBusComponent implements OnInit {
  constructor(
    private busService: BusService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteBusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.busService.DeleteBus(this.data).subscribe({
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
