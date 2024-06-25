import { Component, OnInit } from '@angular/core';
import { IBusClassDetails } from '../../../models/busClass/ibus-class-details';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { AddBusClassComponent } from '../add-bus-class/add-bus-class.component';
import { IBusClassAdd } from '../../../models/busClass/ibus-class-add';
import { UpdateBusClassComponent } from '../update-bus-class/update-bus-class.component';
import { IBusClassRead } from '../../../models/busClass/ibus-class-read';
import { BusClassDetailsComponent } from '../bus-class-details/bus-class-details.component';
import { DeleteBusClassComponent } from '../delete-bus-class/delete-bus-class.component';

@Component({
  selector: 'app-all-bus-classes',
  templateUrl: './all-bus-classes.component.html',
  styleUrls: ['./all-bus-classes.component.scss'],
})
export class AllBusClassesComponent implements OnInit {
  busClasses: IBusClassDetails[] = [];

  constructor(
    private busClassService: BusClassService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllBusClasses();
  }

  FilterBusClasses() {
    // if (userId.value == '0') {
    //   this.GetAllReports();
    //   console.log('all');
    // } else {
    //   this.GetAllReportsByUserId(userId.value);
    //   console.log('byUser');
    //   console.log(userId.value);
    // }
  }

  GetAllBusClasses() {
    this.busClassService.GetAllBusClasses().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.busClasses = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  AddBusClass() {
    const dialogRef = this.dialog.open(AddBusClassComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBusClasses();
      }
    });
  }

  UpdateBusClass(busClass: IBusClassRead) {
    const dialogRef = this.dialog.open(UpdateBusClassComponent, {
      width: '750px',
      data: busClass,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBusClasses();
      }
    });
  }

  BusClassDetails(busClass: IBusClassRead) {
    const dialogRef = this.dialog.open(BusClassDetailsComponent, {
      width: '750px',
      data: busClass,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBusClasses();
      }
    });
  }

  DeleteBusClass(busClassId: number) {
    const dialogRef = this.dialog.open(DeleteBusClassComponent, {
      width: '750px',
      data: busClassId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBusClasses();
      }
    });
  }
}
