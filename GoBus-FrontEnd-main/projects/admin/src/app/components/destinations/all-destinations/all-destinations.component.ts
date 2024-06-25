import { Component, OnInit } from '@angular/core';
import { IDestinationRead } from '../../../models/destination/idestination-read';
import { DestinationService } from '../../../services/destination/destination.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { AddDestinationComponent } from '../add-destination/add-destination.component';
import { DestinationDetailsComponent } from '../destination-details/destination-details.component';
import { UpdateDestinationComponent } from '../update-destination/update-destination.component';
import { DeleteDestinationComponent } from '../delete-destination/delete-destination.component';

@Component({
  selector: 'app-all-destinations',
  templateUrl: './all-destinations.component.html',
  styleUrls: ['./all-destinations.component.scss'],
})
export class AllDestinationsComponent implements OnInit {
  destinations: IDestinationRead[] = [];

  constructor(
    private destinationService: DestinationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllDestinations();
  }



  GetAllDestinations() {
    this.destinationService.GetAllDestinations().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.destinations = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  AddDestination() {
    const dialogRef = this.dialog.open(AddDestinationComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDestinations();
      }
    });
  }

  UpdateDestination(destination: IDestinationRead) {
    const dialogRef = this.dialog.open(UpdateDestinationComponent, {
      width: '750px',
      data: destination,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDestinations();
      }
    });
  }

  DestinationDetails(destination: IDestinationRead) {
    const dialogRef = this.dialog.open(DestinationDetailsComponent, {
      width: '750px',
      data: destination,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDestinations();
      }
    });
  }

  DeleteDestination(destinationId: number) {
    const dialogRef = this.dialog.open(DeleteDestinationComponent, {
      width: '750px',
      data: destinationId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDestinations();
      }
    });
  }
}
