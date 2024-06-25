import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBranchRead } from '../../../models/branch/ibranch-read';
import { IBusRead } from '../../../models/bus/ibus-read';

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.scss'],
})
export class BusDetailsComponent implements OnInit {
  busForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<BusDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBusRead
  ) {
    this.busForm = this.fb.group({
      number: [data?.number || ''],
      capacity: [data?.capacity || ''],
      model: [data?.model || ''],
      year: [data?.year || ''],
      busClassName: [data?.classBusName || ''],
      driver: [data?.driverFirstName + ' ' + data?.driverLastName || ''],
    });
  }
  ngOnInit(): void {}

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
  get busClassName() {
    return this.busForm.get('busClassName');
  }
  get driver() {
    return this.busForm.get('driver');
  }
}
