import { Component, OnInit } from '@angular/core';
import { IReservationDetails } from '../../models/ireservation-details';
import { ReservationService } from '../../services/reservation/reservation.service';
import { DatePipe } from '@angular/common';
import { IResponse } from '../../models/iresponse';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.scss'],
})
export class ReservationHistoryComponent implements OnInit {
  reservations: IReservationDetails[] = [];
  user: IUser = {} as IUser;

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,

    private dPipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.GetUser();
  }

  GetUser() {
    this.userService.GetUser().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.user = response.data as IUser;
        this.GetAllReservations(this.user.id);
      },
      // error: (e) => {},
      // complete: () => console.log('complete'),
    });
  }

  GetAllReservations(userId: string) {
    this.reservationService.GetReservationsByUser(userId).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.reservations = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
