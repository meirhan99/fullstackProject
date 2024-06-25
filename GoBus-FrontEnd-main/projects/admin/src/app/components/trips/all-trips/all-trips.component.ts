import { Component, OnInit } from '@angular/core';
import { ITripDetails } from '../../../models/trip/itrip-details';
import { TripService } from '../../../services/trip/trip.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { AddTripComponent } from '../add-trip/add-trip.component';
import { UpdateTripComponent } from '../update-trip/update-trip.component';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { DeleteTripComponent } from '../delete-trip/delete-trip.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.scss'],
})
export class AllTripsComponent implements OnInit {
  trips: ITripDetails[] = [];
  today: string | null = '';

  constructor(
    private tripService: TripService,
    public dialog: MatDialog,
    private dPipe: DatePipe
  ) {
    this.today = dPipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.GetAllTrips();
  }

  FilterTrips(departureDate: any) {
    this.tripService.FilterTripsByDate(departureDate.value).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.trips = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
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

  AddTrip() {
    const dialogRef = this.dialog.open(AddTripComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllTrips();
      }
    });
  }

  UpdateTrip(trip: ITripDetails) {
    const dialogRef = this.dialog.open(UpdateTripComponent, {
      width: '750px',
      data: trip,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllTrips();
      }
    });
  }

  TripDetails(trip: ITripDetails) {
    const dialogRef = this.dialog.open(TripDetailsComponent, {
      width: '750px',
      data: trip,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllTrips();
      }
    });
  }

  DeleteTrip(tripId: number) {
    const dialogRef = this.dialog.open(DeleteTripComponent, {
      width: '750px',
      data: tripId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllTrips();
      }
    });
  }
}
