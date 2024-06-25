import { Component, OnInit } from '@angular/core';
import { IReservationDetails } from '../../../models/reservation/ireservation-details';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { IResponse } from '../../../models/iresponse';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';
import { DeleteReservationComponent } from '../delete-reservation/delete-reservation.component';
import { TripService } from '../../../services/trip/trip.service';
import { ITripDetails } from '../../../models/trip/itrip-details';
import { UserService } from '../../../services/user/user.service';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-all-reservation',
  templateUrl: './all-reservation.component.html',
  styleUrls: ['./all-reservation.component.scss'],
})
export class AllReservationComponent implements OnInit {
  reservations: IReservationDetails[] = [];
  trips: ITripDetails[] = [];
  users: IUserRead[] = [];

  today: string | null = '';

  constructor(
    private reservationService: ReservationService,
    private tripService: TripService,
    public dialog: MatDialog,
    private userService: UserService,

    private dPipe: DatePipe
  ) {
    this.today = dPipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.GetAllReservations();
    this.GetAllTrips();
    this.GetAllUsers();
  }

  FilterByTripIdReservations(tripId: any) {
    if (tripId.value == 0) {
      this.GetAllReservations();
    } else {
      this.reservationService
        .FilterReservationsByTripId(tripId.value)
        .subscribe({
          next: (v) => {
            let response = v as IResponse;
            this.reservations = response.data;
          },
          // error: (e) => console.log(e),
          // complete: () => console.log('complete'),
        });
    }
  }

  FilterReservationsByDate(reservationDate: any) {
    this.reservationService
      .FilterReservationsByDate(reservationDate.value)
      .subscribe({
        next: (v) => {
          let response = v as IResponse;
          this.reservations = response.data;
        },
        // error: (e) => console.log(e),
        // complete: () => console.log('complete'),
      });
  }

  FilterByUserName(user: any) {
    if (user.value == 0) {
      this.GetAllReservations();
    } else {
      this.reservationService.FilterReservationsByUserId(user.value).subscribe({
        next: (v) => {
          let response = v as IResponse;
          this.reservations = response.data;
        },
        // error: (e) => console.log(e),
        // complete: () => console.log('complete'),
      });
    }
  }

  GetAllTrips() {
    this.tripService.GetAllTrips().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.trips = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
  GetAllUsers() {
    this.userService.GetAllUsers().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.users = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetAllReservations() {
    this.reservationService.GetAllReservations().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.reservations = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  ReservationDetails(reservation: IReservationDetails) {
    const dialogRef = this.dialog.open(ReservationDetailsComponent, {
      width: '750px',
      data: reservation,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllReservations();
      }
    });
  }

  DeleteReservation(reservationId: number) {
    const dialogRef = this.dialog.open(DeleteReservationComponent, {
      width: '750px',
      data: reservationId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllReservations();
      }
    });
  }
}
