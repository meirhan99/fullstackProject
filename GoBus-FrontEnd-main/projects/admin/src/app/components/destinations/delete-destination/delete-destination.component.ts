import { Component, OnInit, Inject } from '@angular/core';
import { DestinationService } from '../../../services/destination/destination.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-destination',
  templateUrl: './delete-destination.component.html',
  styleUrls: ['./delete-destination.component.scss'],
})
export class DeleteDestinationComponent implements OnInit {
  constructor(
    private destinationService: DestinationService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteDestinationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.destinationService.DeleteDestination(this.data).subscribe({
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
