import { Component, OnInit } from '@angular/core';
import { IBusRead } from '../../../models/bus/ibus-read';
import { IBusClassRead } from '../../../models/busClass/ibus-class-read';
import { BusService } from '../../../services/bus/bus.service';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { AddBusComponent } from '../add-bus/add-bus.component';
import { UpdateBusComponent } from '../update-bus/update-bus.component';
import { BusDetailsComponent } from '../bus-details/bus-details.component';
import { DeleteBusComponent } from '../delete-bus/delete-bus.component';

@Component({
  selector: 'app-all-buses',
  templateUrl: './all-buses.component.html',
  styleUrls: ['./all-buses.component.scss'],
})
export class AllBusesComponent implements OnInit {
  buses: IBusRead[] = [];
  busClasses: IBusClassRead[] = [];

  constructor(
    private busService: BusService,
    private busClassService: BusClassService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllBuses();
    this.GetAllBusClasses();
  }

  FilterBuses(busId: any) {
    if (busId.value == 0) {
      this.GetAllBuses();
    } else {
      this.GetBusesByClassId(busId.value);
    }
  }

  GetBusesByClassId(busClassId: number) {
    this.busService.GetBusesByClassId(busClassId).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.buses = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
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
  GetAllBuses() {
    this.busService.GetAllBuses().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.buses = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  AddBus() {
    const dialogRef = this.dialog.open(AddBusComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBuses();
      }
    });
  }

  UpdateBus(bus: IBusRead) {
    const dialogRef = this.dialog.open(UpdateBusComponent, {
      width: '750px',
      data: bus,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBuses();
      }
    });
  }

  BusDetails(bus: IBusRead) {
    const dialogRef = this.dialog.open(BusDetailsComponent, {
      width: '750px',
      data: bus,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBuses();
      }
    });
  }

  DeleteBranch(busId: number) {
    const dialogRef = this.dialog.open(DeleteBusComponent, {
      width: '750px',
      data: busId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBuses();
      }
    });
  }
}
