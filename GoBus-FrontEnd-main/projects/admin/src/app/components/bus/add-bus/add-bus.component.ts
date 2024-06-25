import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusClassRead } from '../../../models/busClass/ibus-class-read';
import { BusService } from '../../../services/bus/bus.service';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { DriverService } from '../../../services/driver/driver.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBusAdd } from '../../../models/bus/ibus-add';
import { IResponse } from '../../../models/iresponse';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.scss'],
})

export class AddBusComponent implements OnInit {
  busForm: FormGroup;
  busClasses: IBusClassRead[] = [];
  drivers: IUserRead[] = [];
  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private busClassService: BusClassService,
    private driverService: DriverService,
    private dialog: MatDialogRef<AddBusComponent>,
    private toastr: ToastrService
  ) {

    this.busForm = this.fb.group({
      number: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      busClassId: ['', [Validators.required]],
      driverId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.GetAllBusClasses();
    this.GetAllDrivers();
  }
  Add() {
    let bus: IBusAdd = this.busForm.value;

    this.busService.AddBus(bus).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
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


  get number() {
    return this.busForm.get('number');
  }

  get capacity() {
    return this.busForm.get('capacity');
  }

  get model() {
    return this.busForm.get('model');
  }

  get year() {
    return this.busForm.get('year');
  }
  get busClassId() {
    return this.busForm.get('busClassId');
  }

  get driverId() {
    return this.busForm.get('driverId');
  }
}
