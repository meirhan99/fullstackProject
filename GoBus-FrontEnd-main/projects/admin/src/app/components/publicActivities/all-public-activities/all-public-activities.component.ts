import { Component, OnInit } from '@angular/core';
import { IPublicActivityRead } from '../../../models/publicActivity/ipublic-activity-read';
import { IDestinationRead } from '../../../models/destination/idestination-read';
import { PublicActivityService } from '../../../services/publicActivity/public-activity.service';
import { DestinationService } from '../../../services/destination/destination.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { AddPublicActivityComponent } from '../add-public-activity/add-public-activity.component';
import { UpdatePublicActivityComponent } from '../update-public-activity/update-public-activity.component';
import { PublicActivityDetailsComponent } from '../public-activity-details/public-activity-details.component';
import { DeletePublicActivityComponent } from '../delete-public-activity/delete-public-activity.component';

@Component({
  selector: 'app-all-public-activities',
  templateUrl: './all-public-activities.component.html',
  styleUrls: ['./all-public-activities.component.scss']
})

export class AllPublicActivitiesComponent implements OnInit {
  publicActivities: IPublicActivityRead[] = [];
  destinations: IDestinationRead[] = [];

  constructor(
    private publicActivityService: PublicActivityService,
    private destinationService: DestinationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllPublicActivities();
    this.GetAllDestinations();
  }

  FilterPublicActivities(destinationId: any) {
    if (destinationId.value == 0) {
      this.GetAllPublicActivities();
    } else {
      this.GetPublicActivitiesByDestinationId(destinationId.value);
    }
  }

  GetPublicActivitiesByDestinationId(destinationId: number) {
    this.publicActivityService.GetPublicActivitiesByDestinationId(destinationId).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.publicActivities = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
  GetAllPublicActivities() {
    this.publicActivityService.GetAllPublicActivities().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.publicActivities = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
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

  AddBranch() {
    const dialogRef = this.dialog.open(AddPublicActivityComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllPublicActivities();
      }
    });
  }

  UpdatePublicActivity(publicActivity: IPublicActivityRead) {
    const dialogRef = this.dialog.open(UpdatePublicActivityComponent, {
      width: '750px',
      data: publicActivity,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllPublicActivities();
      }
    });
  }

  PublicActivityDetails(publicActivity: IPublicActivityRead) {
    const dialogRef = this.dialog.open(PublicActivityDetailsComponent, {
      width: '750px',
      data: publicActivity,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllPublicActivities();
      }
    });
  }

  DeletePublicActivity(publicActivityId: number) {
    const dialogRef = this.dialog.open(DeletePublicActivityComponent, {
      width: '750px',
      data: publicActivityId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllPublicActivities();
      }
    });
  }
}
