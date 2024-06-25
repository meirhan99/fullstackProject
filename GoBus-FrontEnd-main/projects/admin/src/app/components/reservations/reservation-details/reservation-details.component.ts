import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IReservationDetails } from '../../../models/reservation/ireservation-details';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<ReservationDetailsComponent>,
    private dPipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: IReservationDetails
  ) {
    this.reservationForm = this.fb.group({
      tripId: [data?.tripId || ''],
      date: [dPipe.transform(data?.date, 'MMM d, y, h:mm:ss a') || ''],
      startBranchName: [data?.startBranchName || ''],
      endBranchName: [data?.endBranchName || ''],
      departureDate: [
        dPipe.transform(data?.departureDate, 'MMM d, y, h:mm:ss a') || '',
      ],
      arrivalDate: [
        dPipe.transform(data?.arrivalDate, 'MMM d, y, h:mm:ss a') || '',
      ],
      busClassName: [data?.busClassName || ''],
      price: [data?.price || ''],
      quantity: [data?.quantity || ''],
      totalPrice: [data?.totalPrice || ''],
      seatNumbers: [`[${data?.seatNumbers.join(', ')}]` || ''],
      userName: [data?.userName || ''],
    });
  }
  ngOnInit(): void {}

  get tripId() {
    return this.reservationForm.get('tripId');
  }
  get date() {
    return this.reservationForm.get('date');
  }
  get startBranchName() {
    return this.reservationForm.get('startBranchName');
  }
  get endBranchName() {
    return this.reservationForm.get('endBranchName');
  }
  get departureDate() {
    return this.reservationForm.get('departureDate');
  }
  get arrivalDate() {
    return this.reservationForm.get('arrivalDate');
  }
  get busClassName() {
    return this.reservationForm.get('busClassName');
  }
  get price() {
    return this.reservationForm.get('price');
  }
  get quantity() {
    return this.reservationForm.get('quantity');
  }
  get totalPrice() {
    return this.reservationForm.get('totalPrice');
  }
  get seatNumbers() {
    return this.reservationForm.get('seatNumbers');
  }
  get userName() {
    return this.reservationForm.get('userName');
  }
}
