import { Component, OnInit } from '@angular/core';
import { IUserRead } from '../../../models/user/iuser-read';
import { DriverService } from '../../../services/driver/driver.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { DriverDetailsComponent } from '../driver-details/driver-details.component';
import { DeleteDriverComponent } from '../delete-driver/delete-driver.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';

@Component({
  selector: 'app-all-drivers',
  templateUrl: './all-drivers.component.html',
  styleUrls: ['./all-drivers.component.scss'],
})
export class AllDriversComponent implements OnInit {
  drivers: IUserRead[] = [];

  constructor(private driverService: DriverService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetAllDrivers();
  }
  GetAllDrivers() {
    this.driverService.GetAllDrivers().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.drivers = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  AddDriver() {
    const dialogRef = this.dialog.open(AddDriverComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDrivers();
      }
    });
  }

  DriverDetails(user: IUserRead) {
    const dialogRef = this.dialog.open(DriverDetailsComponent, {
      width: '750px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDrivers();
      }
    });
  }

  DeleteDriver(userId: string) {
    const dialogRef = this.dialog.open(DeleteDriverComponent, {
      width: '750px',
      data: userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllDrivers();
      }
    });
  }
}
