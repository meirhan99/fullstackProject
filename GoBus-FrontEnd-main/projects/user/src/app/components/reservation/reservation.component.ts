import { Component, OnInit } from '@angular/core';
import { IResponse } from '../../models/iresponse';
import { IUser } from '../../models/iuser';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip/trip.service';
import { ITrip } from '../../models/itrip';
import { BusService } from '../../services/bus/bus.service';
import { IBus } from '../../models/ibus';
import { TicketService } from '../../services/ticket/ticket.service';
import { ITicket } from '../../models/iticket';
import { ReservationService } from '../../services/reservation/reservation.service';
import { IReservation } from '../../models/ireservation';
import { ToastrService } from 'ngx-toastr';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  trip: ITrip = {} as ITrip;
  user: IUser = {} as IUser;
  bus: IBus = {} as IBus;
  chairs: number[] = [];
  passengers: number = 1;
  tripId: number = 1;
  reservedSeats: number[] = [];
  selectedSeats: number[] = [];
  done: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private tripService: TripService,
    private busService: BusService,
    private ticketService: TicketService,
    private reservationService: ReservationService,
    private paymentService: PaymentService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.passengers = Number(paramMap.get('passengers'));
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.tripId = Number(paramMap.get('tripId'));
    });
    this.GetTripById(this.tripId);
    this.GetTicketsByTripId(this.tripId);
    this.GetUser();
  }

  BookNow() {
    let reservation: IReservation = {
      quantity: this.passengers,
      userId: this.user.id,
      tripId: this.tripId,
      seatNumbers: this.selectedSeats,
    };
    this.reservationService.AddReservation(reservation).subscribe({
      next: (v) => {
        let response: IResponse = v as IResponse;
        this.PaymentIntentCreated(response.data);

        // this.router.navigate(['/login']);
      },
      // error: (e) => {
      //   this.toaster.error('Register failed');
      // },
      // complete: () => console.log('complete'),
    });
  }

  PaymentIntentCreated(reservationId: number) {
    this.paymentService.CreatePaymentIntent(reservationId).subscribe({
      next: (v) => {
        let response: IResponse = v as IResponse;
        this.toaster.success('success', 'Payment Intent Created');
        this.PayNow(response.data);
      },
      // error: (e) => {
      //   this.toaster.error('Register failed');
      // },
      // complete: () => console.log('complete'),
    });
  }

  PayNow(data: any) {
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '575px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } else {
        this.reservationService.DeleteReservation(data.id).subscribe({
          next: (v) => {
            this.toaster.error(`Reservation failed.`);
          },
          // error: (e) => {
          //   this.toaster.error('Register failed');
          // },
          // complete: () => console.log('complete'),
        });
      }
    });
  }

  SelectedSeat(seatNumber: number) {
    if (this.selectedSeats.includes(seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(
        (item) => item !== seatNumber
      );
      this.done = false;
    } else {
      this.selectedSeats.push(seatNumber);
    }
    if (this.selectedSeats.length == this.passengers) {
      this.done = true;
    }
  }

  GetTripById(id: number) {
    this.tripService.GetById(id).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.trip = response.data;
        this.GetBusById(this.trip.busId);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
  GetBusById(id: number) {
    this.busService.GetById(id).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.bus = response.data;
        for (let i = 1; i <= this.bus.capacity; i++) {
          this.chairs.push(i);
        }
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetTicketsByTripId(id: number) {
    this.ticketService.GetAllByTripId(id).subscribe({
      next: (v) => {
        let response = v as IResponse;
        let reservedTickets = response.data as ITicket[];
        for (let i = 0; i < reservedTickets.length; i++) {
          this.reservedSeats.push(reservedTickets[i].seatNumber);
        }
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetUser() {
    this.userService.GetUser().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.user = response.data as IUser;
      },
      // error: (e) => {},
      // complete: () => console.log('complete'),
    });
  }
}
