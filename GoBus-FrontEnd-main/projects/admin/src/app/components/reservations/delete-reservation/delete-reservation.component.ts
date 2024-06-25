import { Component, OnInit,Inject } from '@angular/core';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.scss']
})

export class DeleteReservationComponent implements OnInit {
  constructor(
    private reservationService: ReservationService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.reservationService.DeleteReservation(this.data).subscribe({
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
