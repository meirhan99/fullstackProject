import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusClassRead } from '../../../models/busClass/ibus-class-read';
import { IUserRead } from '../../../models/user/iuser-read';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { ToastrService } from 'ngx-toastr';
import { BusService } from '../../../services/bus/bus.service';
import { DriverService } from '../../../services/driver/driver.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBusRead } from '../../../models/bus/ibus-read';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-update-bus',
  templateUrl: './update-bus.component.html',
  styleUrls: ['./update-bus.component.scss'],
})
export class UpdateBusComponent {
  busForm: FormGroup;
  busClasses: IBusClassRead[] = [];
  drivers: IUserRead[] = [];
  constructor(
    private fb: FormBuilder,
    private busService: BusService,
    private busClassService: BusClassService,
    private driverService: DriverService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<UpdateBusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBusRead
  ) {
    this.busForm = this.fb.group({
      number: [data.number, [Validators.required]],
      capacity: [data.capacity, [Validators.required]],
      currentBranch: [data.currentBranch, [Validators.required]],
      model: [data.model, [Validators.required]],
      year: [data.year, [Validators.required]],
      busClassId: [data.classBusId, [Validators.required]],
      driverId: [data.driverId, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.GetAllBusClasses();
    this.GetAllDrivers();
  }

  Update() {
    this.busService.UpdateBus(this.data.id, this.busForm.value).subscribe({
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
  get currentBranch() {
    return this.busForm.get('currentBranch');
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
