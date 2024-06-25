import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ITripDetails } from '../../../models/trip/itrip-details';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent {
  tripForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dPipe: DatePipe,
    public dialog: MatDialogRef<TripDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITripDetails
  ) {
    this.tripForm = this.fb.group({
      startBranch: [data.startBranchName, [Validators.required]],
      endBranch: [data.endBranchName, [Validators.required]],
      departureDate: [data.departureDate, [Validators.required]],
      arrivalDate: [data.arrivalDate, [Validators.required]],
      price: [data.price, [Validators.required]],
      busClass: [data.busClassName, [Validators.required]],
    });
  }
  ngOnInit(): void {}

  get startBranch() {
    return this.tripForm.get('startBranch');
  }
  get endBranch() {
    return this.tripForm.get('endBranch');
  }
  get departureDate() {
    return this.tripForm.get('departureDate');
  }
  get arrivalDate() {
    return this.tripForm.get('arrivalDate');
  }
  get price() {
    return this.tripForm.get('price');
  }
  get busClass() {
    return this.tripForm.get('busClass');
  }
}
