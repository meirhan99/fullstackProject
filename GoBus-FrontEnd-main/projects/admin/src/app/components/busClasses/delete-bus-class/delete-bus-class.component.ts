import { Component, OnInit,Inject } from '@angular/core';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-bus-class',
  templateUrl: './delete-bus-class.component.html',
  styleUrls: ['./delete-bus-class.component.scss']
})

export class DeleteBusClassComponent implements OnInit {
  constructor(
    private busClassService: BusClassService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteBusClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.busClassService.DeleteBusClass(this.data).subscribe({
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
