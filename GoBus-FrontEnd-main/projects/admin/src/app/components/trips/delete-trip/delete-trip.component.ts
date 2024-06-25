import { Component, OnInit ,Inject} from '@angular/core';
import { TripService } from '../../../services/trip/trip.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.scss']
})

export class DeleteTripComponent implements OnInit {
  constructor(
    private tripService: TripService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteTripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.tripService.DeleteTrip(this.data).subscribe({
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
