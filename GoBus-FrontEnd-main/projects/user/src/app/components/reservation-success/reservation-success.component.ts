import { Component, OnInit } from '@angular/core';
import { IResponse } from '../../models/iresponse';
import { ReservationService } from '../../services/reservation/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { IReservationDetails } from '../../models/ireservation-details';

@Component({
  selector: 'app-reservation-success',
  templateUrl: './reservation-success.component.html',
  styleUrls: ['./reservation-success.component.scss'],
})
export class ReservationSuccessComponent implements OnInit {
  reservationId: number = 0;
  response: IResponse = {} as IResponse;
  reservationDetails: IReservationDetails = {} as IReservationDetails;
  constructor(
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationId = Number(
      this.activatedRoute.snapshot.paramMap.get('reservationId')
    );
    this.GetReservationById(this.reservationId);
  }

  GetReservationById(reservationId: number) {
    this.reservationService.GetReservationById(reservationId).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.reservationDetails = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
